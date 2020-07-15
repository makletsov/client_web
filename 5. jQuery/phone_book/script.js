$(document).ready(function () {
    'use strict';

    function cleanFieldText(func) {
        var text = $(this).val().trim();

        if (func) {
            text = func.call(text);
        }

        return text;
    }

    function checkFieldText(field, regexp, func) {
        var text = cleanFieldText.call(field, func);
        var check = text.match(regexp);

        if (!check || check.length !== 1 || text !== check[0]) {
            field.addClass('is-invalid');
        } else {
            field.addClass('is-valid');
        }
    }

    var form = $('#add-person-form');

    var nameRegExp = /[a-zA-Zа-яА-ЯёЁ]+[-?a-zA-Zа-яА-ЯёЁ]+/g;
    var phoneRegExp = /^\+?[0-9]+/g;
    var phoneCleanRegExp = /[()\- ]/g;

    form.find('.word').change(function () {
        $(this).removeClass('is-valid')
            .removeClass('is-invalid');

        checkFieldText($(this), nameRegExp);
    });

    form.find('#input-phone').change(function () {
        $(this).removeClass('is-valid')
            .removeClass('is-invalid');

        checkFieldText($(this), phoneRegExp, function () {
            return this.replace(phoneCleanRegExp, "");
        });
    });

    var recordsCount = 0;

    form.find('#add-person').click(function () {
        var fieldsSet = form.find('.form-control');
        var validElementsCount = form.find('.is-valid').length;

        if (validElementsCount < 3) {
            fieldsSet.trigger('change');
            return;
        }

        recordsCount++;

        var newRow = $('<tr></tr>');

        var name = cleanFieldText.call($('#input-name'));
        var surname = cleanFieldText.call($('#input-surname'));
        var phone = cleanFieldText.call($('#input-phone'), function () {
            return this.replace(phoneCleanRegExp, "");
        });

        newRow.append($('<td class="row-number">' + recordsCount + '</td>'))
            .append($('<td>' + name + '</td>'))
            .append($('<td>' + surname + '</td>'))
            .append($('<td>' + phone + '</td>'))
            .append($('<td><button class="delete-row">Удалить</button></td>'));

        $('tbody').append(newRow);

        fieldsSet.val("");
        fieldsSet.removeClass('is-valid')
            .removeClass('is-invalid');

        newRow.find('.delete-row').click(function () {
            var rowNumber = +newRow.find('.row-number').text();

            newRow.remove();
            recordsCount--;

            $('#phone-book').find('.row-number').filter(function (index, element) {
                return +$(this).text() >= rowNumber;
            }).each(function () {
                $(this).text(rowNumber++);
            });
        });
    });
});