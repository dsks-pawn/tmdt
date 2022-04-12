const express = require("express");
const router = express.Router();
import rp from "request-promise";
import fs from "fs";
import { dateTime } from "../helpers/Date";

const baseUrl = "https://shopee.vn/";
const allCateUrl = baseUrl + "api/v4/pages/get_category_tree";
const detailCateUrl =
	baseUrl +
	"api/v4/search/search_items?by=ctime&limit=60&order=desc&page_type=search&scenario=PAGE_OTHERS&version=2";
const detailProductUrl = baseUrl + "api/v4/item/get?";
const LogShopee = fs.createWriteStream("LogShopee.txt", { flags: "a" });

let options = {
	method: "GET",
	Connection: "keep-alive",
	headers: {
		"User-Agent":
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
	},
	insecure: true,
};

let listProxy = [
	{
		protocol: "http",
		ip: "123.27.186.120",
		port: 19132,
	},
	// {
	// 	protocol: "https",
	// 	ip: "14.248.119.31",
	// 	port: 19132,
	// },
];

var promiseCategory = Promise.resolve();
var promiseListProduct = Promise.resolve();
const intervalEachCategory = 60 * 60 * 1000;
const intervalEachListProduct = 5000;
const intervalNextPage = 60 * intervalEachListProduct;

const crawlAllCategoryData = async (url) => {
	let random = Math.floor(Math.random() * listProxy.length);
	let proxy = listProxy[random];
	let proxyUsage = `${proxy.protocol}://${proxy.ip}:${proxy.port}`;
	let proxiedRequest = rp.defaults({ proxy: proxyUsage });

	options.uri = url;
	proxiedRequest(options)
		.then(async (data) => {
			const result = JSON.parse(data);
			result.data.category_list.forEach((cate, index) => {
				cate.children.forEach((cateChild, index2) => {
					promiseCategory = promiseCategory.then(function () {
						let urlNext = `${detailCateUrl}&match_id=${cateChild.catid}&newest=`;
						crawlListProduct(urlNext, cate, cateChild, 0);
						return new Promise(function (resolve) {
							setTimeout(resolve, intervalEachCategory);
						});
					});
				});
			});
		})
		.catch(function (err) {
			crawlAllCategoryData(allCateUrl);
			console.log("errShoppe Category :: ", err.toString());
		});
};

const crawlListProduct = async (url, cate, cateChild, newest) => {
	let random = Math.floor(Math.random() * listProxy.length);
	let proxy = listProxy[random];
	let proxyUsage = `${proxy.protocol}://${proxy.ip}:${proxy.port}`;
	let proxiedRequest = rp.defaults({ proxy: proxyUsage });

	console.log("newest", newest);
	options.uri = url + newest;
	proxiedRequest(options)
		.then(async (data) => {
			const result = JSON.parse(data);
			if (result.items || result.items.length > 0) {
				result.items.forEach((product, index) => {
					promiseListProduct = promiseListProduct.then(function () {
						let urlNext = `${detailProductUrl}itemid=${product.item_basic.itemid}&shopid=${product.item_basic.shopid}`;
						crawlDetailProduct(urlNext, cate, cateChild);
						setTimeout(function () {
							crawlListProduct(url, cate, cateChild, newest + 60);
						}, index * intervalNextPage);
						return new Promise(function (resolve) {
							setTimeout(resolve, intervalEachListProduct);
						});
					});
				});
			}
		})
		.catch(function (err) {
			console.log("errShoppe ListProduct :: ", err.toString());
		});
};

const crawlDetailProduct = async (url, cate, cateChild) => {
	let random = Math.floor(Math.random() * listProxy.length);
	let proxy = listProxy[random];
	let proxyUsage = `${proxy.protocol}://${proxy.ip}:${proxy.port}`;
	let proxiedRequest = rp.defaults({ proxy: proxyUsage });

	options.uri = url;
	proxiedRequest(options)
		.then(async (data) => {
			const result = JSON.parse(data);
			console.log(result.data.itemid);
			LogShopee.write(
				dateTime() + " ----- : " + result.data.itemid + "\n"
			);
		})
		.catch(function (err) {
			console.log("errShoppe DetailProduct :: ", err.toString());
		});
};

crawlAllCategoryData(allCateUrl);

module.exports = router;
