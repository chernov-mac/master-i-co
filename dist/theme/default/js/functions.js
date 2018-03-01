function updateSliderInputs(values, inputs) {
    for (var i = 0; i < values.length; i++) {
        inputs[i].val(parseInt(values[i], 10));
    }
}
