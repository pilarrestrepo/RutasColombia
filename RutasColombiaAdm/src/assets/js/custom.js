
// Basic Select2 select
$(".select2").select2({
    dropdownAutoWidth: true,
    width: '100%'
});
// Select With Icon
$(".select2-icons").select2({
    dropdownAutoWidth: true,
    width: '100%',
    minimumResultsForSearch: Infinity,
    templateResult: iconFormat,
    templateSelection: iconFormat,
    escapeMarkup: function (es) { return es; }
});

// Format icon
function iconFormat(icon) {
    var originalOption = icon.element;
    if (!icon.id) { return icon.text; }
    var $icon = "<i class='material-icons'>" + $(icon.element).data('icon') + "</i>" + icon.text;
    return $icon;
}
// Theme support
$(".select2-theme").select2({
    dropdownAutoWidth: true,
    width: '100%',
    placeholder: "Classic Theme",
    theme: "classic"
});