# -*- coding: utf-8 -*-
# from odoo import http


# class BeforSave(http.Controller):
#     @http.route('/befor_save/befor_save', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/befor_save/befor_save/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('befor_save.listing', {
#             'root': '/befor_save/befor_save',
#             'objects': http.request.env['befor_save.befor_save'].search([]),
#         })

#     @http.route('/befor_save/befor_save/objects/<model("befor_save.befor_save"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('befor_save.object', {
#             'object': obj
#         })

