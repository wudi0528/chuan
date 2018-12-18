const express = require('express');
const static = require('express-static');
const ejs = require('ejs');
const port = 86;
const url = require('url');
const mysql = require('mysql');
const server = express();

var aa = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'w123123',
	database:'news'
});
// 传悦首页
server.get("/",(request,response)=>{
	ejs.renderFile("html/index.html",(error,data)=>{
		if(error){
			console.log(error);
		}else{
			response.end(data);
		}
	});
});
// 传悦观点
server.get("/vv",(request,response)=>{
	aa.query(`select * from xinwen`,(error,result)=>{
		ejs.renderFile("html/chuanyuefuwu.html",{data:result},(error,data)=>{
			if(error){
				console.log(error);
			}else{
				response.end(data);
			}
		});
	});
});
// 传悦详情
server.get("/tt",(request,response)=>{
	var newsId = url.parse(request.url,true).query.newsId;
	aa.query(`select * from xinwen where id=${newsId}`,(error,result)=>{
		if(!error){
			ejs.renderFile("html/jiejuefanganxiangqing.html",{data:result[0]},(error,data)=>{
				if(error){
					console.log(error);
				}else{
					response.end(data);
				}
			});
		}
	});
});
// 获取新闻
server.get("/xin",(request,response)=>{
	aa.query(`select * from xinwen`,(error,data)=>{
		if(error){
			console.log(error)
		}else{
			response.end(JSON.stringify(data))
		}
	})
});
// 添加
server.get("/qq",(request,response)=>{
	var title = url.parse(request.url,true).query.title;
	var neirong = url.parse(request.url,true).query.neirong;
	if(title){
		aa.query(`insert into xinwen (title,neirong) values ("${title}","${neirong}")`,(error,data)=>{
			if(error){
				console.log(error)
			}else{
				console.log(data)
			}
		})
	}
});
server.get("/ww",(request,response)=>{
	var newsId = url.parse(request.url,true).query.id;
	var title = url.parse(request.url,true).query.title;
	var neirong = url.parse(request.url,true).query.neirong;
	if(title){
		aa.query(`update xinwen set title="${title}",neirong="${neirong}" where id=${newsId}`,(error,data)=>{
			if(error){
				console.log(error)
			}else{
				console.log('成功')
			}
		})
	}
});
// 删除
server.get("/ee",(request,response)=>{
	var newsId = url.parse(request.url,true).query.newsId;
	aa.query(`delete from xinwen where id=${newsId}`,(error,data)=>{
		if(error){
			console.log(error)
		}else{
			console.log('成功')
		}
	})
});
server.use(static(__dirname + "/html"));
server.listen(port);