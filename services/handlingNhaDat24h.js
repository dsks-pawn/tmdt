
export const handlingOutsideEcommerce = ($) => {
    let date = new Date()
    let d = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
    let result = []
    let resTime
    if ($('.dv-item-vip').length > 0) {
        $('.dv-item-vip').each(function (index) {
            let timeRaw = $(this).find('div > p:nth-child(2)').text().trim().replace('- Tin được tài trợ', '')
            if (timeRaw.indexOf('Phút trước') > -1) {
                let dateCur = new Date() - (Number(timeRaw.replace('Phút trước.', '')) * 1000)
                dateCur = new Date(dateCur)
                resTime = d + " " + dateCur.getHours() + ":" + dateCur.getMinutes()
            } else {
                timeRaw = timeRaw.replace(/[lúc: . phút]/g, "").replace("giờ", ":").split(',')
                timeRaw[0] = timeRaw[0].indexOf('nay') || timeRaw[0].indexOf('trước') > -1 ? d : timeRaw[0].replace(/\//g, '-').split(/\-|\s/).slice(0, 3).reverse().join('/')
                resTime = timeRaw[0] + " " + timeRaw[1]
            }
            result.push({
                title: $(this).find('div > h4 a').text().trim(),
                href: "https://nhadat24h.net" + $(this).find('div > h4 a').attr("href"),
                description: $(this).find('div > div.pn1 > label').text().trim().replace("Xem tiếp", ""),
                price: $(this).find('.a-txt-cl1').text().trim(),
                area: $(this).find('.a-txt-cl2').text().trim(),
                contact_mobile: $(this).find('div.pn2 > div.divbtntuontac a.preCall').attr('data-mobi'),
                contact_name: $(this).find('div > div.pn2 .divImage  a img').attr('alt'),
                time: resTime
            })
        })
    }
    if ($('.dv-item').length > 0) {
        $('.dv-item').each(function (index) {
            let timeRaw = $(this).find('div > p:nth-child(2)').text().trim().replace('- Tin được tài trợ', '')
            if (timeRaw.indexOf('Phút trước') > -1) {
                let dateCur = new Date() - (Number(timeRaw.replace('Phút trước.', '') * 1000))
                dateCur = new Date(dateCur)
                resTime = d + " " + dateCur.getHours() + ":" + dateCur.getMinutes()
            } else {
                timeRaw = timeRaw.replace(/[lúc: . phút]/g, "").replace("giờ", ":").split(',')
                timeRaw[0] = timeRaw[0].indexOf('nay') || timeRaw[0].indexOf('trước') > -1 ? d : timeRaw[0].replace(/\//g, '-').split(/\-|\s/).slice(0, 3).reverse().join('/')
                resTime = timeRaw[0] + " " + timeRaw[1]
            }
            result.push({
                title: $(this).find('div > h4 a').text().trim(),
                href: "https://nhadat24h.net" + $(this).find('div > h4 a').attr("href"),
                description: $(this).find('div > div.pn1 > label').text().trim().replace("Xem tiếp", ""),
                price: $(this).find('.a-txt-cl1').text().trim(),
                area: $(this).find('.a-txt-cl2').text().trim(),
                contact_mobile: $(this).find('div.pn2 > div.divbtntuontac a.preCall').attr('data-mobi'),
                contact_name: $(this).find('div > div.pn2 .divImage  a img').attr('alt'),
                time: resTime
            })
        })
    }
    return result
}

export const handlingDetailEcommerce = ($, result) => {
    // result.code_news = $('.dv-tb-tsecommerce tbody tr:nth-child(4) > td:nth-child(2) > strong').text().trim()
    result.type_of_news = $('#ContentPlaceHolder1_ctl00_lbLoaiTin').text().trim()
    result.address = $('#ContentPlaceHolder1_ctl00_lbTinhThanh').text().trim()
    result.facade = $('#ContentPlaceHolder1_ctl00_lbHuong').text().indexOf('---') > -1 ? null : $('#ContentPlaceHolder1_ctl00_lbHuong').text().trim()

    $('.dv-tb-tsecommerce tbody tr').each(function () {
        let data = $(this).text().trim()
        switch (true) {
            case (data.indexOf('Đường vào') > -1):
                result.road_in_front = data.replace('Đường vào', '').trim()
                break;
            case (data.indexOf('Số tầng') > -1):
                result.floor = data.replace('Số tầng', '').trim()
                break;
            case (data.indexOf('Mã BĐS') > -1):
                result.code_news = data.replace('Mã BĐS', '').trim()
                break;
            case (data.indexOf('Số phòng') > -1):
                result.rooms = data.replace('Số phòng', '').replace('Phòng Ngủ', '').replace(/./g, '').trim()
                break;
            default:
                return
        }
    })
    result.html_content = $('#ContentPlaceHolder1_Panel1 > div.ct-in-l > div.dv-main-detail > div').html()
    result.content = $('#ContentPlaceHolder1_ctl00_divContent').text().trim()
    return result
}

