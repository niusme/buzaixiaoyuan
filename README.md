# 我在校园anyproxy脚本，实现模拟请假

##### 理论上支持所有安卓设备。但是由于当前 微信app 大多安装于安卓系统7.1以上，导致微信只信任自己的内部证书。所以。该脚本实现基于 vmos一类的虚拟机上 或者 安卓系统<=7.1的手机上
---

# 免责声明
* 请大家务必遵循法律法规，校纪校规，配合当地的疫情防控措施。
* 该脚本仅供大家学习交流使用，不得作用于任何非法用途。一切责任由使用者负责，与作者无关。
* 本脚本的实现并未对服务器造成任何影响。
 ---
 # 制作脚本的缘由
1. 前端时间在浏览github时，无意看见了一些关于我在校园的开源项目。发现有许多开源的打卡，脚本。接着往下看，发现居然还可以模拟请假。我一时来了兴趣。但是这些开源脚本都是基于ios的 Quantumult X, Surge, Loon 的代理下的。
2. 本人发现没用任何关于安卓的。我就很不服气，于是百度，学习，百度，学习。最终成功实现了模拟请假的功能。
3. 本人在封校期间的突发奇想，但没有用作于实际操作。
4. 仅供交流学习，请在下载后24小时内删除。一切责任由使用者自负，与作者无关。
  ---
# 使用说明
1. anyproxy的原理：通过代理，先拦截传送到你的手机的响应数据，然后通过node.js 编写脚本，修改响应数据，再转发到你的手机上。所以不会对服务器造成任何操作。
2. 安装vmos：建议安装7.1版本的带xposed的系统，然后再下载一个justTrustMe 模块安装在xposed 里面。重启vmos.
3. 在电脑上安装anyproxy。
      3.1 pc:自行百度安装
      3.2 anyproxy 想要拦截移动端数据，就必须在移动端下载证书并安装，再修改手机里的wifi的代理配置。如果是使用vmos一类的虚拟机，那么证书和wifi的代理配置都再vmos里面设置就OK了。
 4. ，进行如上安装后，我们可以在PC 上访问anyproxy的页面，如果能访问，并且能看见数据，就说明操作成功了一大半了。剩下的就是编写脚本，修改响应的数据。
 5. 代码部分
	```			module.exports = {
				  *beforeSendResponse(requestDetail, responseDetail) {
					  //getlist
					if (requestDetail.url === 'https://student.wozaixiaoyuan.com/leave2/getList.json') {
					  const newResponse = responseDetail.response;
					  const b=Buffer.from(newResponse.body);


							  if(b.toString()==""){

							  }
							  else{
								  const body=JSON.parse(b.toString());
							  console.log("添加前："+JSON.stringify(body));


								//请假理由//(留空则不修改)
								title = "回家";    //(留空则不修改)

								//请假类型 事假 病假 实习 科研 出差 回家
								type = "回家";     //(留空则不修改)

								//假条状态 3假期中
								state = 3;

								//指定假期开始时间结束时间 格式 "2021-06-28 10:00"
								//不指定则默认开始时间为当前 前1小时，结束时间当前 后2小时，不同时间打开会改变
								start = "";
								end = "";

								Date.prototype.format=function(fmt){var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),"S":this.getMilliseconds()};if(/(y+)/.test(fmt)){fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))};for(var k in o){if(new RegExp("("+k+")").test(fmt)){fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)))}};return fmt};



								function getFormatTime(time, flag) {
						  if (flag === 1) {
							return time.format("yyyy-MM-dd hh:mm")
						  } else {
							return time.format("MM-dd hh:mm")
						  }
						};

								//生成时间
								var time = new Date();
								time.setMinutes(0, 0, 0);
								if (start === "" && end === "") {
								  time.setHours(time.getHours() - 1);
								  start = getFormatTime(time, 1);//开始时间
								  time.setHours(time.getHours() + 3);
								  end = getFormatTime(time, 1);//结束时间
								};


								data=body.data[0];
								if ("finishDate" in data) { delete data["finishDate"] };
								if (start) { data["start"] = start; };
								if (end) { data["end"] = end; };
								if (state) { data["state"] = state };
								if (title) { data["title"] = title };
								if (type) { data["type"] = type };


								body.data[0]=data;

								newResponse.body=JSON.stringify(body);
								console.log("添加后："+JSON.stringify(body));
							  }
					  // newResponse.body.data[9]=t;
					  //newResponse.body += '-- AnyProxy Hacked! --';
					  return new Promise((resolve, reject) => {
						setTimeout(() => { // delay the response for 5s
						  resolve({ response: newResponse });
						}, 1);
					  });
					}

					//getLeave
					if(requestDetail.url === 'https://student.wozaixiaoyuan.com/leave2/getLeave.json'){

						const newResponse = responseDetail.response;
						const b=Buffer.from(newResponse.body);
						if(b.toString()==""){

						}else{
							const body=JSON.parse( b.toString());

							//自定义设置，根据需要自行更改，不填写则不会更改
							var user = {
								//指定假期开始时间结束时间 格式 "2021-06-28 10:00"
								//不指定则默认开始时间为当前 前1小时，结束时间当前 后2小时，不同时间打开会改变
								"start": "",
								"end": "",

								"state": 2,//假条状态 2应该是假期中
								"out": 1,//是否离校 1是 0否
								"studentName": "",//姓名，留空不变
								"studentId": "",//学生id，留空不变
								"type": "",//请假类型 事假 病假 实习 科研 出差 回家，留空不变
								"route": "",//外出地点，留空不变
								"location": "",//校区,销假地点,留空不变，注意格式[\"佛山三水校区\"]
								"tel": "",//紧急联系电话，留空不变
								"reason": "",//请假理由，留空不变
								"userHead": "",//学生头像，默认随机，留空不变

								//下面这部分似乎不会在页面上显示
								"date": "",//请假提交时间，，留空不变
								"school": "",//学校，留空不变
								"college": "",//学院，留空不变
								"grade": "",//班级，留空不变
								"number": "",//学号，留空不变
								"phone": "",//电话，留空不变

								//下面这两条作用不明，懒得测试
								"scanHistory": [],//留空不变
								"imgs": [],//留空不变

								"teacher": "",//老师姓名，留空不变
								"approve": [
									{
										"time": "",//审批时间，留空随机生成，格式12.21 11:10

										"state": 2,//审核状态 3拒绝 2通过 1审批中
										"userType": 4,//老师身份，4为辅导员，3为院级，2为校级
										"name": "",//老师姓名，留空不变
										"reason": "",//审批理由，留空不变
										"position": "",//老师学院，留空不变
										"head": "http://lorempixel.com/400/400/"//老师头像，默认随机，留空不变
									}
								]
							};


							Date.prototype.format=function(fmt){var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),"S":this.getMilliseconds()};if(/(y+)/.test(fmt)){fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))};for(var k in o){if(new RegExp("("+k+")").test(fmt)){fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)))}};return fmt};

							function getFormatTime(time, flag) {
								if (flag === 1) {
									return time.format("yyyy-MM-dd hh:mm")
								} else {
									return time.format("MM-dd hh:mm")
								}
							};



							//以下生成时间
							var time = new Date();
							time.setMinutes(0, 0, 0);
							if (user["start"] == "" && user["end"] == "") {
								time.setHours(time.getHours() - 1);
								user["start"] = getFormatTime(time, 1);//开始时间
								time.setHours(time.getHours() + 3);
								user["end"] = getFormatTime(time, 1);//结束时间
							};
							if (user["approve"][0]["time"] == "") {//批假时间 前一天随机时刻
								time.setHours(Math.floor(Math.random() * (22 - 9 + 1) + 9), Math.floor(Math.random() * 60));

								time.setDate(time.getDate() - 1);
								user["approve"][0]["time"] = getFormatTime(time, 2);
								//请假提交时间
								user["date"]=getFormatTime(time, 2);
							};


							data=body["data"];


							for (x in user) {//读取用户自定义设置
								if (x != "approve") {
									if (user[x]) {
										data[x] = user[x];
									}
								}
							};
							for (y in user["approve"][0]) {//读取用户自定义设置
								if (user["approve"][0][y]) {
									data["approve"][0][y] = user["approve"][0][y];
								}
							};

							body["data"]=data;
							newResponse.body=JSON.stringify(body);
						}


						return new Promise((resolve, reject) => {
						  setTimeout(() => { // delay the response for 5s
							resolve({ response: newResponse });
						  }, 1);
						});


					}
				  },
				};

6.关于如何在没用电脑的地方进行，当然是把anyproxy 部署在服务器上或者内网穿透啦

# 参考、致谢
[uiolee/BuZaiXiaoYuan 借鉴了该作者的代码](https://github.com/uiolee/BuZaiXiaoYuan)
