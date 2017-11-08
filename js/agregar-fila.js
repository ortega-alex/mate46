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

/*	function sumatoriaXY(){		
		
		var sumax = 0,sumay = 0 , sx2 = 0,sx3 = 0,sx4 = 0,sx5 = 0,
		sx6 = 0,sx7 = 0,sx8 = 0,sx9 = 0,sx10 = 0,sx11 = 0,sx12 = 0,sx13 = 0;
		sx14 = 0,sx15 = 0,sx16 = 0,sx17 = 0,sx18 = 0,sx19 = 0,sx20 = 0,sx21 = 0,sx22 = 0;
		
		var sxy = 0 , sx2y = 0,sx3y = 0,sx4y = 0,sx5y = 0,
		sx6y = 0,sx7y = 0,sx8y = 0,sx9y = 0,sx10y = 0,sx11y = 0;
		var ymp2 = 0;
		$('#tabla tr').each(function(){		
			//x^
			temx = $(this).find('td').eq(1).text();		
			sumax += parseFloat(temx);			
			sx2 +=  Math.pow(temx, 2);sx3 += Math.pow(temx, 3);
			sx4 +=  Math.pow(temx, 4);sx5 += Math.pow(temx, 5);			
			sx6 +=  Math.pow(temx, 6);sx7 += Math.pow(temx, 7);
			sx8 +=  Math.pow(temx, 8);sx9 += Math.pow(temx, 9);			
			sx10 +=  Math.pow(temx, 10);sx11 += Math.pow(temx, 11);
			sx12 +=  Math.pow(temx, 12);sx13 += Math.pow(temx, 13);
			sx14 +=  Math.pow(temx, 14);sx15 += Math.pow(temx, 15);
			sx16 +=  Math.pow(temx, 16);sx17 += Math.pow(temx, 17);			
			sx18 +=  Math.pow(temx, 18);sx19 += Math.pow(temx, 19);
			sx20 +=  Math.pow(temx, 20);sx21 += Math.pow(temx, 21);			
			sx22 +=  Math.pow(temx, 22);
			//x^y
			temy = $(this).find('td').eq(2).text();
			var por = temx*temy;			
			sxy += parseFloat(por);			
			sx2y +=  (Math.pow(temx, 2)*temy);sx3y += (Math.pow(temx, 3)*temy);
			sx4y +=  (Math.pow(temx, 4)*temy);sx5y += (Math.pow(temx, 5)*temy);			
			sx6y +=  (Math.pow(temx, 6)*temy);sx7y += (Math.pow(temx, 7)*temy);
			sx8y +=  (Math.pow(temx, 8)*temy);sx9y += (Math.pow(temx, 9)*temy);			
			sx10y += (Math.pow(temx, 10)*temy);sx11y += (Math.pow(temx, 11)*temy);
		});
		$('#tabla tr').each(function(){
			temy = $(this).find('td').eq(2).text();			
			sumay += parseFloat(temy);
			var p = $('#p').val();
			ymp2 += Math.pow(temy-p, 2);			
		});
		
		$('#sx').text(sumax.toFixed(2));$('#sy').text(sumay.toFixed(2));
		$('#sx2').text(sx2.toFixed(2));$('#sx3').text(sx3.toFixed(2));
		$('#sx4').text(sx4.toFixed(2));$('#sx5').text(sx5.toFixed(2));
		$('#sx6').text(sx6.toFixed(2));$('#sx7').text(sx7.toFixed(2));
		$('#sx8').text(sx8.toFixed(2));$('#sx9').text(sx9.toFixed(2));
		$('#sx10').text(sx10.toFixed(2));$('#sx11').text(sx11.toFixed(2));
		$('#sx12').text(sx12.toFixed(2));$('#sx13').text(sx13.toFixed(2));
		$('#sx14').text(sx14.toFixed(2));$('#sx15').text(sx15.toFixed(2));
		$('#sx16').text(sx16.toFixed(2));$('#sx17').text(sx17.toFixed(2));
		$('#sx18').text(sx18.toFixed(2));$('#sx19').text(sx19.toFixed(2));
		$('#sx20').text(sx20.toFixed(2));$('#sx21').text(sx21.toFixed(2));
		$('#sx22').text(sx22.toFixed(2));

		//x^y
		$('#sxy').text(sxy.toFixed(2));
		$('#sx2y').text(sx2y.toFixed(2));$('#sx3y').text(sx3y.toFixed(2));
		$('#sx4y').text(sx4y.toFixed(2));$('#sx5y').text(sx5y.toFixed(2));
		$('#sx6y').text(sx6y.toFixed(2));$('#sx7y').text(sx7y.toFixed(2));
		$('#sx8y').text(sx8y.toFixed(2));$('#sx9y').text(sx9y.toFixed(2));
		$('#sx10y').text(sx10y.toFixed(2));$('#sx11y').text(sx11y.toFixed(2));

		//promediro
		var n = parseFloat($('#n').val());
		var s = parseFloat($('#sy').text());
		var total = s/n;
		$('#p').val(total.toFixed(2));		
		promediado();		
	}*/

	function promediado(){
		var temy = 0,sumay = 0, ymp2 = 0;
		$('#tabla tr').each(function(){
			temy = $(this).find('td').eq(2).text();			
			sumay += parseFloat(temy);
			var p = $('#p').val();
			ymp2 += Math.pow(temy-p, 2);			
		});
		$("#y-yp").val(ymp2);
		//(y-yp)^2		
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
