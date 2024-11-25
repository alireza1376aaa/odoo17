# -*- coding: utf-8 -*-
{
    'name': "web_befor_save",

    'summary': "Short (1 phrase/line) summary of the module's purpose",

    'description': """
Long description of module's purpose
    """,

    'author': "My Company",
    'website': "https://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base','web','hr'],

    # always loaded
    'data': [
        'views/res__user_save.xml',
        'views/res_save.xml',
        'views/hr_save.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'web_befor_save/static/src/js/custom_form.js',
            'web_befor_save/static/src/css/index.css'

        ],
    },
}

