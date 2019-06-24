module.exports = function askTemplateButtons(text, ...buttons) {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": text,
                "buttons": JSON.stringify(buttons)
            }
        }
    }
}