

function divisores(){
	var dn = $("#denominador").val();
	var modelo = parseInt($("#m").val());
	var x = 0;
    var tem = modelo;
	for(var i = 0; i <= modelo; i++){
		$('#tabla4 tr').each(function(){ 
        	x = $(this).find('td').eq(i).text();        	                   
    	});
        $("#a"+tem).text(x/dn);
        tem--;          
	}
	pirson();
}

function pirson(){
    var x = 0 , n = $("#n").val();
    var m = $("#m").val();
    var cont = 0, dt = 0;
    var elev = m , summ = 0;
    var mm = 0 , p = 0;    
    $('#tabla tr').each(function(){         
        var tem = 0;
        x = $(this).find('td').eq(1).text();
        for(var i=m;i>=1;i--){
            dt = $("#a"+i).text();
            tem += dt*Math.pow(x,elev);
            elev--; cont = i;

        }
        cont--;
        dt = $("#a"+cont).text();
        var t = (parseFloat(tem)) + (parseFloat(dt)); 
        elev = m;         
        summ += t;        
        p = summ/n;
    }); 
    $("#model").val(summ.toFixed(2));   
    $('#tabla tr').each(function(){         
        var tem = 0;
        x = $(this).find('td').eq(1).text();
        for(var i=m;i>=1;i--){
            dt = $("#a"+i).text();
            tem += dt*Math.pow(x,elev);
            elev--; cont = i;

        }
        cont--;
        dt = $("#a"+cont).text();
        var t = (parseFloat(tem)) + (parseFloat(dt));      
        elev = m;
        mm += Math.pow(t - p,2);

    });    
    $("#mp").val(mm.toFixed(2));
    var yp = $("#y-yp").val();  
    var porcentage = (mm/yp)*100; 
    $("#pr").val(porcentage.toFixed(2));
}


$(document).ready(function(){
	/*$("#bt_add").click(function(event) {
		divisores();
        //console.log("click");		
	});*/


        $('#bt_generar').click(function(event) {
            //sumatoriaXY();
            divisores();
        });    
        $("#m").change(function(event) {           
            if($("#n").val() >= 1 && $("#x").val() == ''){
          //      console.log("change");
                divisores();
            }
        });
        
});