import _ from '@lodash';

// eslint-disable-next-line
Number.prototype.format = function(n=2, x=3, s='.', c=',') {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

export function hasEmptyField(form, fieldsExcluded = []) {
    let binaryAnd = 1;
    for(let key in form){
        if(fieldsExcluded.includes(key))
            continue;
        binaryAnd &= !!String(form[key]).length
        if(!binaryAnd)
            break;
    }
    return !binaryAnd
}

export function hasArrayEmptyField(array, fieldsExcluded = []) {
    let binaryAnd = 1;
    for(let item of array){
        binaryAnd &= !hasEmptyField(item, fieldsExcluded)
        if(!binaryAnd)
            break;
    }
    return !binaryAnd
}

export function cutString(str, length = 4) {
    return str.substring(0, str.length - length);
}

// CA
export function getCurrentDate() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let auxDay = date.getDate() < 10 ? '0' : '';
    return `${date.getFullYear()}-${month}-${auxDay}${date.getDate()}`;
}
// CA

export function getCurrentTime() {
    let date = new Date();
    let auxHour = date.getHours() < 10 ? '0' : '';
    let auxMin = date.getMinutes() < 10 ? '0' : '';
    return `${auxHour}${date.getHours()}:${auxMin}${date.getMinutes()}`;
}

export function getRoleFunctionActions(menuOptions, actions, auxFunction, criteria = 'id') {
    if (!_.isEmpty(actions, true))
        return actions;
    else {
        let currentFunction = menuOptions.find(function(x) { return x[`${criteria}`] === auxFunction });
        
        if (currentFunction)
            return currentFunction.roles[0].actions;
        else
            return [];
    }
}

export function mergeExaminations(services) {
    let examinations = []
    for(let service of services)
        examinations = [...examinations,...service.examinations]
    return examinations
}