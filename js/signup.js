         	new Vue({
          		el:'#page',
          		data:{
          			sex_select:[
          				{name:'男'},
          				{name:'女'}
          			],
          			bed_select:[
          				{name:'不预定'},
          				{name:'两人间'},
          				{name:'四人间'},
          				{name:'六人间'}        			     				
          			],
          			sex:'男',
          			bed:'不预定',
          			height:'',
          			name:'',
          			tel:'',
          			school:'',
          			areas:'',
          			wechat:'',
          			userMessage:''         		          			
          		},
          		methods:{
          			change_init:function(obj){
          				var _this = this;  
        				_this.sex=obj.target.innerHTML;
        				document.getElementById('sexs').style.display='none'; 
          			},
          			changebed_init:function(obj){
          				var _this = this;  
        				_this.bed=obj.target.innerHTML;
        				document.getElementById('beds').style.display='none';
          			},
          			sex_show:function(obj){         								
          				document.getElementById('sexs').style.display='block'; 
          				var h =window.screen.height/3;
          				this.height=window.screen.height - h+'px';
          				document.getElementById('sexs').style.paddingTop=h+'px';
        				},
          			bed_show:function(obj){
          				document.getElementById('beds').style.display='block';
          				document.getElementById('beds').style.height=document.getElementsByTagName('windows').height/4;
          				var h =window.screen.height/4;
          				this.height=window.screen.height - h+'px';
          				document.getElementById('beds').style.paddingTop=h+'px';
          			},
          			validate:function(){
          			
          				var _this = this;
          				_this.areas=document.getElementById('value1').value;
          				var new_data = _this.areas.split(',');
          				var provinceCode = new_data[0];
          				var cityCode = new_data[1];
          				var countyCode = new_data[2];          				
          				var tag = 1;
          					if(_this.name==''){
          						 layer.open({content: '请输入姓名',skin: 'msg',time: 2});								  
	          					tag = 0;
	          					return
	          				}else{
	          					tag = 1;
	          				}
	          				if(_this.areas==''){
          						 layer.open({content: '请选择地址',skin: 'msg',time: 2});								  
	          					tag = 0;
	          					return
	          				}else{
	          					tag = 1;
	          				}
	          				if(!(/^1[34578]\d{9}$/.test(_this.tel))){
	          					layer.open({content: '请输入正确的手机号码',skin: 'msg',time: 2});
	          					tag = 0;
	          					return
	          				}else{
	          					tag = 1;
	          				}          				
	          				if(tag = 1){
//	          					console.log(1);
	          					_this.getData()
	          				}         		         				
          			
          			this.$http.get("js/LAreaData1.js").then(function (res) {
						   var res = res.data;
            				var res= res.slice(14,-2);
//        					var obj = JSON.parse(res); 
          					var obj = eval('(' + res + ')');
          					var n = 0;
          					var m = 0;   
          					var area1=area2=area3='';
          					for(var i=0;i<33;i++){
          						if(obj[i].id==provinceCode){
//        							console.log(obj[i].name);
          							area1=obj[i].name;
          							n = i;
          						}
          					}   
          					var city = obj[n]; 
          					for(var i=0;i<city.child.length;i++){
          						if(city.child[i].id==cityCode){
          							area2=city.child[i].name;
          							m = i;
          						}
          					}
          					var country = city.child[m];
						if(country.child){
							for(var i=0;i<country.child.length;i++){
								if(country.child[i].id==countyCode){
									area3=country.child[i].name;
								}
							}
						}else{
							area3=''
						}


          				_this.areas=area1+' '+area2+' '+area3;
          					          					
          				});
          			},
          			getData:function(){
          				this.$http.get("https://api.github.com/repos/Jam741/redGoCustrom").then(function (res) {
						var _this = this;
	 					_this.description = res.data.description;
						var sex = document.getElementById('sex').value;
						var area = document.getElementById('area').value;
						var bed_reservation = document.getElementById('bed_reservation').value;
						_this.userInfo = _this.name+'-'+sex+'-'+_this.tel+'-'+_this.school+'-'+area+'-'+bed_reservation+'-'+_this.wechat+';';
						_this.userMessage=_this.description+'+'+_this.userInfo;
						console.log(_this.userInfo);
						this.$http.patch("https://api.github.com/repos/Jam741/redGoCustrom?access_token=af4710b4fd29a0188802de51c1ae66b90d1c163b",
		          			{"name":"redGoCustrom","description":this.userMessage}
		          			).then(function(res){
		          				layer.open({content: '恭喜你，报名成功',skin: 'msg',time: 5});
//		          				console.log(res);
		          			}).catch(e=>{
//		          				console.log(e)
		          			})
			          })	
          			
          			}
        		}
          	})
