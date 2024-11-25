# -*- coding: utf-8 -*-

from odoo import models, fields, api

class major(models.Model):
    _name = 'task_qumi_button.major'
    _description = 'task_qumi_button.major'
    _rec_name = 'majorname'

    majorname = fields.Char(string='رشته')
    student_selector = fields.One2many('task_qumi_button.student','major_selector', 'task_qumi_button.student')


class student(models.Model):
    _name = 'task_qumi_button.student'
    _description = 'task_qumi_button.student'
    _rec_name = 'name'
    name = fields.Char(string='نام نام خانوادگی')
    age = fields.Integer(string='سن')
    value2 = fields.Float(compute="_value_pc", store=True)
    description = fields.Text(string='درباره او')
    major_selector = fields.Many2one('task_qumi_button.major', ondelete='cascade')

    @api.model
    def get_values(self):
        data = self.env['task_qumi_button.student'].search([])
        print('********************************************')
        return data.read()
    
    @api.depends('age')
    def _value_pc(self):
        for record in self:
            record.value2 = float(record.age) / 100
            
    
    @api.model
    def check_condition_show_dialog(self, record_id, data_changed):
        context={"opendialog":False,"typedialog":"","message":""}
        
        if int(data_changed['age']) > 15 and int(data_changed['age']) < 30:
            context={"opendialog":True,"typedialog":"confirm","message":"سن متوسطی داری چیکار میکنی میایی یا نه"}
            
        elif int(data_changed['age']) >= 30:
            context={"opendialog":True,"typedialog":"alert","message":"اوه اوه سن تو بالاس نمیشه"}

        return context

