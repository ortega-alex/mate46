	var cont=0 , x = null, y = null, temx = 0 , temy = 0;
	var id_fila_selected=[];
	var xd = ['78','79','80','81','82','83','84','85','86','87','88'];
	var yd = ['61','62','63','64','65','66','67','68','69','70','71'];

	/*	
	*sumatorias
	*/
	var xk = new Array();
	var yk = new Array();

	function agregar(x,y){
		cont++;
		var fila='<tr class="selected" id="fila'+cont+'" onclick="seleccionar(this.id);"><td>'+cont+'</td><td>'+x+'</td><td>'+y+'</td></tr>';
		$('#tabla').append(fila);
		reordenar();
		
		$('#x').val('');$('#y').val('');
		x = null; y = null;		
	}

	function sumatorias(){	
		xk.length = 0;		
		yk.length = 0;		
		var modelo = (parseInt($("#m").val()) * 2)+2;
		var modeloy = parseInt($("#m").val()) +2;	
		var sumax = 0 , sumay = 0;		
		$('#tabla tr').each(function(){	
			var temx = $(this).find('td').eq(1).text();	
			var temy = $(this).find('td').eq(2).text();	
			sumax += parseFloat(temx);
			sumay += parseFloat(temy);		
			if(xk.length == 0 && yk.length == 0){;	
				for (var i = 2 ; i < modelo; i++) {
					xk.push(Math.pow(temx,i));
				}
				for (var j = 2 ; j < modeloy; j++) {
					yk.push(Math.pow(temy,j));
				}
			}else{
				var exponente = 2;
				var exponentey = 2;
				xk.forEach(function(id,index) {
					//console.log('valor anterior X: '+id+'  mas celda: '+temx+' exponmente: '+exponente+' mas nuevo calculo: '+Math.pow(temx,exponente));
				    xk.splice(index,1,id+Math.pow(temx,exponente));
				    exponente++;
				});
			
				yk.forEach(function(id,index) {
					//console.log('valor anterior Y: '+id+'  mas celda: '+temy+' exponmente: '+exponentey+' mas nuevo calculo: '+Math.pow(temy,exponentey));
				    yk.splice(index,1,id+Math.pow(temy,exponentey));
				    exponentey++;
				});
			}
				
		});

		$('#sx').text(sumax.toFixed(2));$('#sy').text(sumay.toFixed(2));
		var total = (parseFloat($('#sy').text()) / parseFloat($('#n').val()));
		$('#p').val(total.toFixed(2));		
		$("#xk").val('');
		$("#yk").val('');	
		$("#xk").val(xk);
		$("#yk").val(yk);	
		promediado();		
	}

	function promediado(){
		var temy = 0,sumay = 0, ymp2 = 0;
		$('#tabla tr').each(function(){
			temy = $(this).find('td').eq(2).text();			
			sumay += parseFloat(temy);
			var p = $('#p').val();
			ymp2 += Math.pow(temy-p, 2);			
		});
		$("#y-yp").val(ymp2);	
	}

	function seleccionar(id_fila){
		if($('#'+id_fila).hasClass('seleccionada')){
			$('#'+id_fila).removeClass('seleccionada');
		}
		else{
			$('#'+id_fila).addClass('seleccionada');
		}
		//2702id_fila_selected=id_fila;
		id_fila_selected.push(id_fila);
	}

	function eliminar(id_fila){
		/*$('#'+id_fila).remove();
		reordenar();*/
		for(var i=0; i<id_fila.length; i++){
			$('#'+id_fila[i]).remove();
		}		
		//sumatoriaXY();
		sumatorias();
		reordenar();
	}

	function reordenar(){
		var num=1;
		$('#tabla tr').each(function(){
			$(this).find('td').eq(0).text(num);
			num++;
		});
		$('#n').val(num-1);
	}

	function eliminarTodasFilas(){
		$('#tabla tr').each(function(){
			$(this).remove();
		});
		//sumatoriaXY();
		sumatorias();
		reordenar();
	}

	function Generar(){
		eliminarTodasFilas();
		for (var i = 0 ; i < xd.length; i++) {
			agregar(xd[i],yd[i]);			
		}
	}

	$(document).ready(function(){
		$('#bt_add').click(function(){
			x = $('#x').val();
			y = $('#y').val();			
			if ((x != '' && x != null) && (y != '' && y != null)) {
				agregar(x,y);
			}else{
				swal({
  					title: "Por favor ingrese dados!",
				});
			}			
		});

		$('#bt_del').click(function(){
			eliminar(id_fila_selected);
		});

		$('#bt_delall').click(function(){
			var message = $(this).data('confirm');
	        //pop up
	        swal({
	            title: "Esta seguro??",
	            text: message, 
	            icon: "warning",
	            buttons: true,
	            dangerMode: true,
	        })
	        .then((willDelete) => {
	          if (willDelete) {
	            swal("Los datos han sido eliminados!", {
	              icon: "success",
	            });
	            eliminarTodasFilas();
	          } else {
	            swal("No se a eliminado!");
	          }
	        });
		});

		$('#bt_generar').click(function(event) {
			if($('#tabla tr').val() == null){
				swal({
  					title: "Por favor ingrese dados!",
				});
			}else{
				if($("#m").val() == null || $("#m").val() == '') {					
					swal({
  						title: "Por favor selecciones um modelo!",
					});
				}else{					
					//sumatoriaXY();
					sumatorias();
					swal({
			  			icon: "success",
					});
				}
			}			
		});

		$("#muestra").click(function(event) {  
			Generar();
	    });  
	});
