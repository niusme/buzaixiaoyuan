module.exports = {
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
