from odoo import models, fields, api , _

class my_save_empl(models.Model):
    _inherit = 'res.partner'      
    
     
    @api.model
    def check_condition_show_dialog(self, record_id, data_changed):
        context={"opendialog":False,"typedialog":"","message":"","can_con_msg":""}
        print(data_changed)
        if 'name'or'phone' in data_changed:
            obj= self.env['res.partner'].search([('name','=', data_changed['name'])])
            nobj= self.env['res.partner'].search([('phone','=', data_changed['phone'])])

            if len(obj.ids)>0 and len(nobj.ids)<=0:
                warning = _('You can edit again') 
                massage = _('This name exists, should it be saved?')
                context={"opendialog":True,"typedialog":"confirm","message":massage,
                         "can_con_msg": warning,"name_for_massage":data_changed['name']}
                
            elif len(nobj)>0:
                massage = _('This Phone exists, Cant be saved')
                context={"opendialog":True,"typedialog":"alert","message":massage}
            else:
                pass
        return context
