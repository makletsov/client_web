$(function () {
    'use strict';

    function trimFieldText(func) {
        var text = $(this).val().trim();

        if (func) {
            text = func.call(text);
        }

        return text;
    }

    function normalisePhoneNumber() {
        return this.replace(/[()\- ]/g, "");
    }

    function checkFieldText(field, regexp, func) {
        var text = trimFieldText.call(field, func);
        var check = text.match(regexp);

        return check && check.length === 1 && text === check[0];
    }

    function isPhoneNumberNotUnique(field) {
        var phoneNumber = trimFieldText.call(field, normalisePhoneNumber);

        return Array.prototype.some.call($('.phone-number'), function (element) {
            return element.textContent === phoneNumber;
        });
    }

    function disableHighlightAllCheckbox() {
        $highlightAllCheckbox.prop('checked', false);
        $highlightAllCheckbox.prop('disabled', true);
    }

    function hideIfNoneChecked(element) {
        var areSomeChecked = Array.prototype.some.call($('.highlight-row-checkbox'), function (checkbox) {
            return $(checkbox).is(':checked');
        });

        if (areSomeChecked) {
            element.show();
        } else {
            element.hide();
        }
    }

    function toggleIfAllChecked(element) {
        var areAllChecked = Array.prototype.every.call($('.highlight-row-checkbox'), function (checkbox) {
            return $(checkbox).is(':checked');
        });

        element.prop('checked', areAllChecked);
    }

    var $form = $('#add-person-form');

    var nameRegExp = /[a-zA-Zа-яА-ЯёЁ]+[-?a-zA-Zа-яА-ЯёЁ]*/g;
    var phoneRegExp = /^\+?[0-9]+/g;

    $form.find('.word').change(function () {
        var $this = $(this);

        $this.removeClass('is-valid is-invalid');

        if (checkFieldText($(this), nameRegExp)) {
            $this.addClass('is-valid');
        } else {
            $this.addClass('is-invalid');
        }
    });

    $form.find('#input-phone').change(function () {
        var $this = $(this);

        $this.removeClass('is-valid is-invalid');

        if (!checkFieldText($this, phoneRegExp, normalisePhoneNumber)) {
            $('#invalid-phone-number').text('Введите корректный номер телефона!');
            $this.addClass('is-invalid');

            return;
        }

        if (isPhoneNumberNotUnique($this)) {
            $('#invalid-phone-number').text('Запись с таким номером уже существует!');
            $this.addClass('is-invalid');

            return;
        }

        $this.addClass('is-valid');
    });

    var recordsCount = 0;

    var $highlightAllCheckbox = $('#highlight-all-checkbox');

    $highlightAllCheckbox.click(function () {
        if ($highlightAllCheckbox.is(':checked')) {
            $('.highlight-row-checkbox').prop('checked', true);
            $deleteSomeLinesButton.show();
        } else {
            $('.highlight-row-checkbox').prop('checked', false);
            $deleteSomeLinesButton.hide();
        }
    });

    var $deleteSomeLinesButton = $('#delete-some-lines-button');

    $deleteSomeLinesButton.confirmation({
        rootSelector: '#delete-all-button',
        singleton: true,
        placement: 'right',
        title: 'Удалить записи?',
        btnOkLabel: ' Да',
        btnOkIconClass: 'material-icons',
        btnOkIconContent: 'done_outline',
        btnCancelLabel: ' Нет',
        btnCancelIconClass: 'material-icons',
        btnCancelIconContent: 'cancel'
    });

    $deleteSomeLinesButton.click(function () {
        var $elementsToRemove = $('.table-row').filter(function (index, element) {
            return $(element).find('.highlight-row-checkbox').is(':checked');
        });

        $elementsToRemove.each(function (index, element) {
            recordsCount--;
            element.remove();
        });

        var rowNumber = 1;

        $('#phone-book').find('.row-number').each(function () {
            $(this).text(rowNumber);
            rowNumber++;
        });

        if (recordsCount === 0) {
            disableHighlightAllCheckbox();
        }

        $deleteSomeLinesButton.hide();
    });

    $form.find('#add-person').click(function () {
        var $fieldsSet = $form.find('.form-control');
        var validElementsCount = $form.find('.is-valid').length;

        if (validElementsCount < 3) {
            $fieldsSet.change();
            return;
        }

        var name = trimFieldText.call($('#input-name'));
        var surname = trimFieldText.call($('#input-surname'));
        var phone = trimFieldText.call($('#input-phone'), normalisePhoneNumber);

        recordsCount++;

        var newRow = $('<tr></tr>').addClass('table-row');

        newRow
            .append($('<td>')
                .append($('<input type="checkbox">')
                    .addClass('highlight-row-checkbox')))
            .append($('<td>')
                .addClass('row-number')
                .text(recordsCount))
            .append($('<td>')
                .text(name))
            .append($('<td>')
                .text(surname))
            .append($('<td>')
                .addClass('phone-number')
                .text(phone))
            .append($('<td>')
                .append($('<button>')
                    .attr({'type': 'button'})
                    .addClass('close delete-row')
                    .append($('<label>')
                        .html('&times;'))));

        $('tbody').append(newRow);

        $highlightAllCheckbox.prop('disabled', false);

        $fieldsSet.val("");
        $fieldsSet.removeClass('is-valid is-invalid');

        var $highlightRowCheckbox = newRow.find('.highlight-row-checkbox');

        $highlightRowCheckbox.change(function () {
            hideIfNoneChecked($deleteSomeLinesButton);
            toggleIfAllChecked($highlightAllCheckbox);
        });

        var $deleteButton = newRow.find('.delete-row');

        $deleteButton.confirmation({
            rootSelector: '.delete-row',
            singleton: true,
            placement: 'bottom',
            title: 'Удалить запись?',
            btnOkLabel: ' Да',
            btnOkIconClass: 'material-icons',
            btnOkIconContent: 'done_outline',
            btnCancelLabel: ' Нет',
            btnCancelIconClass: 'material-icons',
            btnCancelIconContent: 'cancel'
        });

        $deleteButton.click(function () {
            var rowNumber = +newRow.find('.row-number').text();

            newRow.remove();
            recordsCount--;

            $('#phone-book').find('.row-number').filter(function () {
                return +$(this).text() >= rowNumber;
            }).each(function () {
                $(this).text(rowNumber);
                rowNumber++;
            });

            hideIfNoneChecked($deleteSomeLinesButton);

            if (recordsCount === 0) {
                disableHighlightAllCheckbox();
            }
        });
    });

    $('body').click(function () {
        $('.delete-row').confirmation('hide');
    });
});