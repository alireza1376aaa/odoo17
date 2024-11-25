/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { IntegerField } from '@web/views/fields/integer/integer_field';
import { useState } from "@odoo/owl";
import { useInputField } from "@web/views/fields/input_field_hook";
import { parseInteger } from "@web/views/fields/parsers";
import { useNumpadDecimal } from "@web/views/fields/numpad_decimal_hook";
import { FloatField } from '@web/views/fields/float/float_field';

patch(IntegerField.prototype, {
    setup() {
        this.state = useState({
            hasFocus: false,
        });
        useInputField({
            getValue: () => this.formattedValue,
            refName: "numpadDecimal",
            parse: (v) => parseInteger(convertDigitsToEnglish(v)),
            
        });
        useNumpadDecimal();
    },
});

patch(FloatField.prototype, {
    setup() {
        this.state = useState({
            hasFocus: false,
        });
        this.inputRef = useInputField({
            getValue: () => this.formattedValue,
            refName: "numpadDecimal",
            parse: (v) => this.parse(convertDigitsToEnglish(v)),
        });
        useNumpadDecimal();
    },
});
function convertDigitsToEnglish(str) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let i = 0; i < 10; i++) {
        str = str.replace(new RegExp(persianDigits[i], 'g'), englishDigits[i]);
        str = str.replace(new RegExp(arabicDigits[i], 'g'), englishDigits[i]);
    }
    return str;
}