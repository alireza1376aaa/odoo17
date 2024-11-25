# -*- coding: utf-8 -*-

from odoo import models, fields, api


class task_qomi_befor_save(models.Model):
    _name = 'befor_save.befor_save'
    _description = 'befor_save.befor_save'

    name = fields.Char()
    value = fields.Integer()
    value2 = fields.Float(compute="_value_pc", store=True)
    description = fields.Text()

    @api.depends('value')
    def _value_pc(self):
        for record in self:
            record.value2 = float(record.value) / 100
            
    @api.model
    def check_condition_show_dialog(self, record_id, data_changed):
        context={"opendialog":False,"typedialog":"","message":""}
        
        if int(data_changed['value']) > 15 and int(data_changed['value']) < 30:
            context={"opendialog":True,"typedialog":"confirm","message":"Warning, the entered value is too large. Do you want to save?"}
            
        elif int(data_changed['value']) >= 30:
            context={"opendialog":True,"typedialog":"alert","message":"Eroor, the entered amount is too large, it is not possible to save"}

        return context
