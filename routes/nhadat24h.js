const express = require('express');
const router = express.Router();
import cheerio from 'cheerio'
import { handlingOutsideEcommerce, handlingDetailEcommerce } from "../services/handlingNhaDat24h"
import rp from 'request-promise';
import NhaDat24hControllers from "../controllers/NhaDat24hControllers"
import ProxyControllers from '../controllers/ProxyControllers'

let timeCrawl = 60 * 60 * 1000

let options = {
    method: 'GET',
    Connection: 'keep-alive',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    transform: function (body) {
        return cheerio.load(body);
    },
    insecure: true
};


var indexNhaDatChoThue = 1
let urlNhaDatChoThue = 'https://nhadat24h.net/cho-thue-bat-dong-san-ha-noi-nha-dat-ha-noi-s295942/'

var indexNhaDatBan = 1
let urlNhaDatBan = 'https://nhadat24h.net/ban-bat-dong-san-ha-noi-nha-dat-ha-noi-s295776/'

const crawlOutsideData = async (url, index) => {
    let proxy = await ProxyControllers.findRandomOnlyRecord()
    let proxyUsage = "http://" + proxy.ip + ":" + proxy.port
    let proxiedRequest = rp.defaults({ proxy: proxyUsage })
    options.uri = url + index
    proxiedRequest(options)
        .then(async ($) => {
            let result = await handlingOutsideEcommerce($)
            if (result.length > 0) CrawlFullData(result, url, proxiedRequest)
            return
        })
        .catch(function (err) {
            setTimeout(() => {
                crawlOutsideData(url, index)
            }, 120000)
            return
        });
}

const CrawlFullData = (data, url) => {
    console.log('indexNhaDatChoThue :', indexNhaDatChoThue);
    console.log('indexNhaDatBan :', indexNhaDatBan);
    data.forEach((element, index) => {
        options.uri = element.href
        proxiedRequest(options)
            .then(async ($) => {
                let result = await handlingDetailEcommerce($, element)
                if (url == urlNhaDatBan) {
                    let check = await NhaDat24hControllers.findOnlyRecordDataLandForSaleByCodeNews(result.code_news)
                    if (check.length == 0) {
                        result.index_crawl = indexNhaDatBan
                        await NhaDat24hControllers.insertOnlyRecordDataLandForSale(result)
                    }
                    if (index == data.length - 1) {
                        indexNhaDatBan++
                        // if (indexNhaDatBan < 10) {
                        //     setTimeout(() => {
                        //         crawlOutsideData(urlNhaDatBan, indexNhaDatBan)
                        //     }, 60000)
                        // } else {
                        //     indexNhaDatBan = 1
                        // }
                        setTimeout(() => {
                            crawlOutsideData(urlNhaDatBan, indexNhaDatBan)
                        }, 60000)
                    }
                    return
                } else {
                    let check = await NhaDat24hControllers.findOnlyRecordDataLandForRentByCodeNews(result.code_news)
                    if (check.length == 0) {
                        result.index_crawl = indexNhaDatChoThue
                        await NhaDat24hControllers.insertOnlyRecordDataLandForRent(result)
                    }
                    if (index == data.length - 1) {
                        indexNhaDatChoThue++
                        // if (indexNhaDatChoThue < 10) {
                        //     setTimeout(() => {
                        //         crawlOutsideData(urlNhaDatChoThue, indexNhaDatChoThue)
                        //     }, 60000)
                        // } else {
                        //     indexNhaDatChoThue = 1
                        // }
                        setTimeout(() => {
                            crawlOutsideData(urlNhaDatChoThue, indexNhaDatChoThue)
                        }, 60000)
                    }
                    return
                }
            })
            .catch(function (err) {
                // setTimeout(() => {
                //     if (url == urlNhaDatBan) {
                //         crawlOutsideData(urlNhaDatBan, indexNhaDatBan)
                //     } else {
                //         crawlOutsideData(urlNhaDatChoThue, indexNhaDatChoThue)
                //     }
                // }, 120000)
                return
            });
    });
}


crawlOutsideData(urlNhaDatBan, indexNhaDatBan)
crawlOutsideData(urlNhaDatChoThue, indexNhaDatChoThue)

setInterval(function () { crawlOutsideData(urlNhaDatBan, indexNhaDatBan) }, timeCrawl);
setInterval(function () { crawlOutsideData(urlNhaDatChoThue, indexNhaDatChoThue) }, timeCrawl);


module.exports = router;
