var addressInit = function(_cmbProvince, _cmbCity, _cmbArea, defaultProvince, defaultCity, defaultArea)
{
    var cmbProvince = document.getElementById(_cmbProvince);
    var cmbCity = document.getElementById(_cmbCity);
    var cmbArea = document.getElementById(_cmbArea);
     
    function cmbSelect(cmb, str)
    {
        for(var i=0; i<cmb.options.length; i++)
        {
            if(cmb.options[i].value == str)
            {
                cmb.selectedIndex = i;
                return;
            }
        }
    }
    function cmbAddOption(cmb, str, obj)
    {
        var option = document.createElement("OPTION");
        cmb.options.add(option);
        option.innerHTML = str;
        option.value = str;
        option.obj = obj;
    }
     
    function changeCity()
    {
        cmbArea.options.length = 0;
        if(cmbCity.selectedIndex == -1)return;
        var item = cmbCity.options[cmbCity.selectedIndex].obj;
        for(var i=0; i<item.areaList.length; i++)
        {
            cmbAddOption(cmbArea, item.areaList[i], null);
        }
        cmbSelect(cmbArea, defaultArea);
    }
    function changeProvince()
    {
        cmbCity.options.length = 0;
        cmbCity.onchange = null;
        if(cmbProvince.selectedIndex == -1)return;
        var item = cmbProvince.options[cmbProvince.selectedIndex].obj;
        for(var i=0; i<item.cityList.length; i++)
        {
            cmbAddOption(cmbCity, item.cityList[i].name, item.cityList[i]);
        }
        cmbSelect(cmbCity, defaultCity);
        changeCity();
        cmbCity.onchange = changeCity;
    }
     
    for(var i=0; i<provinceList.length; i++)
    {
        cmbAddOption(cmbProvince, provinceList[i].name, provinceList[i]);
    }
    cmbSelect(cmbProvince, defaultProvince);
    changeProvince();
    cmbProvince.onchange = changeProvince;
}
 
var provinceList = [
{name:'福建', cityList:[
{name:'选择城市', areaList:['选择地区']},
{name:'福州市', areaList:['鼓楼区','台江区','仓山区','马尾区','晋安区']},
{name:'厦门市', areaList:['思明区','海沧区','湖里区','集美区','同安区','翔安区']},
{name:'泉州市', areaList:['鲤城区','丰泽区','洛江区','泉港区']},
{name:'漳州市', areaList:['芗城区','龙文区']},
{name:'龙岩市', areaList:['新罗区','永定区']},
{name:'三明市', areaList:['梅列区','三元区']},
{name:'南平市', areaList:['延平区','建阳区']},
{name:'宁德市', areaList:['蕉城区','东侨区']},
{name:'莆田市', areaList:['城厢区','涵江区','荔城区','秀屿区']},
{name:'平潭综合实验区', areaList:['平潭综合实验区']},
]},

];