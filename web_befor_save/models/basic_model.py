# -*- coding: utf-8 -*-
from odoo import http, models, fields, api, _

class BaseModel(models.AbstractModel):
    _inherit = 'base'

    #Inherit this function to decide when confirm dialog will show
    @api.model
    def check_condition_show_dialog(self, record_id, data_changed):
        """ 
            :param self: current model.
                   record_id: id of record if save on write function, False on create function
                   data_changed: data changed on form
            :returns:  {"opendialog":True,"typedialog":"confirm","message":""}
                      opendialog :True: show dialog or False: ignore dialog
                      typedialog : confirm or alert
                      message : The text displayed in the dialog
        """
        
        return {"opendialog":True,"typedialog":"confirm","message":'massage for confirm or alarm',
                         "can_con_msg": 'massage warning',"name_for_massage":"name of data give in db"}
