/** @odoo-module **/
import { FormController } from '@web/views/form/form_controller';
import { patch } from "@web/core/utils/patch";
import { executeButtonCallback } from "@web/views/view_button/view_button_hook";
import { ConfirmationDialog , AlertDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";
import { FormArchParser } from "@web/views/form/form_arch_parser";
import { archParseBoolean, getActiveActions } from "@web/views/utils";
import { visitXML } from "@web/core/utils/xml";
import { Field } from "@web/views/fields/field";
import { Widget } from "@web/views/widgets/widget";
import { usePager } from "@web/search/pager_hook";
import { escape } from "@web/core/utils/strings";
import { markup } from "@odoo/owl";

patch(FormArchParser.prototype, {
    parse(xmlDoc, models, modelName) {
        const jsClass = xmlDoc.getAttribute("js_class");
        const disableAutofocus = archParseBoolean(xmlDoc.getAttribute("disable_autofocus") || "");
        
        // custom_form/////////////////////////////////////
        const data_changed = archParseBoolean(xmlDoc.getAttribute("data_changed") || "");
        // custom_form/////////////////////////////////////

        const activeActions = getActiveActions(xmlDoc);
        const fieldNodes = {};
        const widgetNodes = {};
        let widgetNextId = 0;
        const fieldNextIds = {};
        let autofocusFieldId = null;
        visitXML(xmlDoc, (node) => {
            if (node.tagName === "field") {
                const fieldInfo = Field.parseFieldNode(node, models, modelName, "form", jsClass);
                if (!(fieldInfo.name in fieldNextIds)) {
                    fieldNextIds[fieldInfo.name] = 0;
                }
                const fieldId = `${fieldInfo.name}_${fieldNextIds[fieldInfo.name]++}`;
                fieldNodes[fieldId] = fieldInfo;
                node.setAttribute("field_id", fieldId);
                if (archParseBoolean(node.getAttribute("default_focus") || "")) {
                    autofocusFieldId = fieldId;
                }
                if (fieldInfo.type === "properties") {
                    activeActions.addPropertyFieldValue = true;
                }
                return false;
            } else if (node.tagName === "div" && node.classList.contains("oe_chatter")) {
                // remove this when chatter fields are declared as attributes on the root node
                return false;
            } else if (node.tagName === "widget") {
                const widgetInfo = Widget.parseWidgetNode(node);
                const widgetId = `widget_${++widgetNextId}`;
                widgetNodes[widgetId] = widgetInfo;
                node.setAttribute("widget_id", widgetId);
            }
        });
        return {
            activeActions,
            autofocusFieldId,
            disableAutofocus,
            fieldNodes,
            data_changed,
            widgetNodes,
            xmlDoc,
        };
    }        
});

patch(FormController.prototype, {
    setup() {
        super.setup();
        this.notification = useService("notification");
        const { data_changed } = this.archInfo;
		this.orm = useService("orm");

        if (data_changed === true){
            $(document).on('keyup',function(){
                if(document.activeElement.tagName === 'INPUT'){
                    $(".o_form_button_create").attr("disabled", true);
                    $(".text-truncate").addClass("d-none");
                    $(".o_menu_toggle").css("pointer-events" , "none");
                    $(".o_menu_sections button").attr("disabled", true);
                    $(".o_menu_sections a").addClass("disabled");
                    $(".o_control_panel_navigation").css("pointer-events" , "none");
                }
                })
        } 

        },

    async check_condition(modelName, record_id ,data_changed) {
            try {
                const tt = Object(data_changed)
                let Data = {}
                for (var key in tt) {
                    if (typeof(tt[key]) !== 'object'){
                        Data[key]=tt[key];
                    }
                  }

                var condition = await this.orm.call(modelName, 'check_condition_show_dialog', [record_id ,Data] , {})
                return condition

            }
            catch(err) {
                console.log('you forget make metod check_condition_show_dialog in model');
                return {"opendialog":false,"typedialog":""}
            }
        },
        
  
    makedialog(check){
        var params = {};
        this.dialogService.add(ConfirmationDialog, { 
            body: markup(
                `<h3 class="position-absolute">${escape(check.name_for_massage)}</h3>
                <p class="fs-4">${escape(check.message)}</p>`
            ),
            confirmClass: "btn-primary_custom_oo",
            confirmLabel: _t("save"),
            confirm: () => {
                return executeButtonCallback(this.ui.activeElement, () => this.save(params));

            },
            cancelLabel : _t("don't save"),
                cancel: () => { 
                    const htmlString = '<div id="alert-notify_s" class="alert alert-warning">'+check.can_con_msg+'</div>';
                    document.body.insertAdjacentHTML('beforeend', htmlString);
                    this.notification.add(
                        _t(check.can_con_msg), 
                        { 
                            title: _t('warning'), 
                            type: "warning", 
                            sticky: false
                        }
                    );
                    setTimeout(()=>{
                        $("#alert-notify_s").slideUp(500, function() {
                            $(this).remove();
                        });
                        // $(".o_notification_manager").slideUp(500, function() {
                        //     $(this).remove();
                        // });
                    }, 5000)
                    
                },
            })

    },
    makealert(check){
        this.dialogService.add(AlertDialog, {
            body: _t(check.message),
        });
        return false
    },

    async check_val(){
        var params = {};
        const { data_changed } = this.archInfo;
        var modelName = this.model.root.resModel ? this.model.root.resModel : false;
        var changes = this.model.root._changes ? this.model.root._changes : this.model.root.data;
        var record_id = this.props.resId;
        if (data_changed === true){
            var resolvedValue = await this.check_condition(modelName, record_id ,changes);
                if (resolvedValue.opendialog === true && resolvedValue.typedialog === 'confirm') {
                    this.makedialog(resolvedValue);
                                }
                else if(resolvedValue.opendialog === true && resolvedValue.typedialog === 'alert'){
                    this.makealert(resolvedValue);
                }
                else{
                    return executeButtonCallback(this.ui.activeElement, () => this.save(params));
                }
        }
        else{
            return false;
        }
    },
    async beforeLeave() {
        this.back_change_css();
        if (this.model.root.dirty) {
            return this.model.root.save({
                reload: true,
                onError: this.onSaveError.bind(this),
            });
        }
    },
	async saveButtonClicked(params = {}) {
        await this.model._askChanges();
        var check_val_fun = await this.check_val();
        if (check_val_fun===false){
            return executeButtonCallback(this.ui.activeElement, () => this.save(params));
        }
    },
    async discard() {
        this.back_change_css();
        if (this.props.discardRecord) {
            this.props.discardRecord(this.model.root);
            return;
        }
        await this.model.root.discard();
        if (this.props.onDiscard) {
            this.props.onDiscard(this.model.root);
        }
        if (this.model.root.isNew || this.env.inDialog) {
            this.env.config.historyBack();
        }
    },
    
    async save(params) {
        super.save(params);
        this.back_change_css();
    },
    back_change_css(){
        $(".o_form_button_create").attr("disabled", false);
        $(".text-truncate").removeClass("d-none");
        $(".o_menu_toggle").css("pointer-events" , "auto");
        $(".o_menu_sections button").attr("disabled", false);
        $(".o_menu_sections a").removeClass("invisible");
        $(".o_control_panel_navigation").css("pointer-events" , "auto");
    }

});

