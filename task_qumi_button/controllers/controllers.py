# -*- coding: utf-8 -*-
# from odoo import http


# class TaskQumiButton(http.Controller):
#     @http.route('/task_qumi_button/task_qumi_button', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/task_qumi_button/task_qumi_button/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('task_qumi_button.listing', {
#             'root': '/task_qumi_button/task_qumi_button',
#             'objects': http.request.env['task_qumi_button.task_qumi_button'].search([]),
#         })

#     @http.route('/task_qumi_button/task_qumi_button/objects/<model("task_qumi_button.task_qumi_button"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('task_qumi_button.object', {
#             'object': obj
#         })

