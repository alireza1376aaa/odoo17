# -*- coding: utf-8 -*-
# from odoo import http


# class TaskQomiPatch(http.Controller):
#     @http.route('/task_qomi_patch/task_qomi_patch', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/task_qomi_patch/task_qomi_patch/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('task_qomi_patch.listing', {
#             'root': '/task_qomi_patch/task_qomi_patch',
#             'objects': http.request.env['task_qomi_patch.task_qomi_patch'].search([]),
#         })

#     @http.route('/task_qomi_patch/task_qomi_patch/objects/<model("task_qomi_patch.task_qomi_patch"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('task_qomi_patch.object', {
#             'object': obj
#         })

