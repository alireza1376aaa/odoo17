# -*- coding: utf-8 -*-

from odoo import models, fields, api, _


class Employee(models.Model):
    _inherit = 'hr.employee'
            
    @api.model
    def check_condition_show_dialog(self, record_id, data_changed):
        context={"opendialog":False,"typedialog":"","message":"","can_con_msg":""}
        print(data_changed)
        if 'name' in data_changed:
            print(data_changed['name'])
            obj= self.env['hr.employee'].search([('name','=', data_changed['name'])])
            print(obj)
            if obj:
                warning = _('You can edit again') 
                massage = _('This name exists, should it be saved?')
                context={"opendialog":True,"typedialog":"confirm","message":massage,
                         "can_con_msg": warning,"name_for_massage":data_changed['name']}
            else:
                pass
        return context