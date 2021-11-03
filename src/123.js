const array = [
    { id: '/abc/template.mjml' },
    { id: '/ddd' },
    { id: '/abc/bc' },
    { id: '/abc/ab/ab.mjml' },
    { id: '/abc/ab' },
    { id: '/abc/abc.mjml' },
    { id: '/abc/bc/qwe.mjml' },
    { id: '/abc/' },
    { id: '/abc/bc/asd.mjml' },
]

array.forEach((item) => item.id = item.id.split('/'))



array.sort((a, b) => {

    if (a.id.includes('.') || b.id.includes('.')) {
        return -1
    }

        if (a.id[1] < b.id[1]) {
            return -1
        }

        if (a.id[1] > b.id[1]) {
            return 1
        }

        if (a.id[1] > b.id[1]) {
            return 0
        }

        if (a.id[2] < b.id[2]) {
            return -1
        }

        if (a.id[2] > b.id[2]) {
            return 1
        }

        if (a.id[2] > b.id[2]) {
            return 0
        }


})

console.log(array)

// array.sort(function (a, b) {
//     return ('' + a.id).localeCompare(b.id);
// })
//
// array.forEach((item) => item.id = item.id.split(',').join('/'))
// console.log(array)