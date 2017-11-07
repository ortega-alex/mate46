        var array = new Array();
        var array2 = new Array();
        var precision = 3;
        var matriz = null;
        //var matriz2 = null;
        var tem2 = 0;
        /*
        *armar determinante 
        */
        function exponentesx(){
            array.length = 0;
            array2.length = 0;
            var tem = 0,tem2 = 0, n = $("#n").val(),x = 0,y = 0; 
            
            $('#tabla-s tr').each(function(){ 
              x = $(this).find('td').eq(1).text();                             
            });
            $('#tabla-s tr').each(function(){               
               y = $(this).find('td').eq(2).text();                             
            });
            array.push(n);
            array.push(x); array2.push(y);           
            $('#tabla1 tr').each(function(){ 
                for(i=0;i<=19;i++){
                    tem = $(this).find('td').eq(i).text();
                    array.push(tem);
                }    
            });
             $('#tabla3 tr').each(function(){ 
                for(i=0;i<=10;i++){
                    tem2 = $(this).find('td').eq(i).text();
                    array2.push(tem2);
                }    
            });
            var m = $("#m").val();  
            armarDenominador(m);
        }

        function armarDenominador(n){
            //var na = 0;
            var matriz2 = 0;
            matriz = createMatriz(parseInt(n)+1);
            matriz2 = createMatriz(parseInt(n)+1);
            var g = parseInt(n) * 2;
            var tem = g;
            for(var i = 0;i <= n; i++){
                for(j = 0;j <= n; j++){
                    matriz[i][j] = array[g];
                    matriz2[i][j] = array[g];
                    $("#i"+i+"j"+j).text(array[g]);
                    g--;
                }
                g = tem-1;
                tem = g;
            }
            var d = determinante(matriz);
            $("#denominador").val(d.toPrecision(precision));
            armarNumerador(matriz2);
        }

        function armarNumerador(matriz2){
            var t = matriz2.length-1;
            var tem = t,c = 1;
            for(var i=0;i<=matriz2.length-1;i++){
                for(var j=0;j<=matriz2.length-1;j++){
                    matriz2[j][i] = array2[t];
                    t--;
                }
                t = tem;   
                var d = determinante(matriz2);
                tem2 = d.toPrecision(precision);
                $("#n"+c).text(d.toPrecision(precision));
                c++;
                for(var k=0; k<=matriz2.length-1;k++){
                    matriz2[k][i] = $("#i"+k+"j"+i).text();
                }
               // console.log(matriz2);
            }
        }

        /**
             * crea una matriz cuadrada
             * @param {integer} size dimension de la matriz
             * */
            function createMatriz(size){
                var matriz = new Array(size);
                for (i = 0; i < size ; i++){ 
                  matriz[i]=new Array(size); 
                } 
                return matriz;
            }
            
            /**
             * calcula el determinante de una matriz NxN
             * @param {array} matriz matriz a calcular
             * */
            function determinante(matriz){                  
                if(matriz.length==2){
                    var det=(matriz[0][0]*matriz[1][1])-(matriz[1][0]*matriz[0][1]);
                    return det;
                }               
                var suma = 0;
                for(var i = 0; i<matriz.length; i++){
                    var nm = createMatriz(matriz.length-1);
                    for(var j=0; j<matriz.length; j++){
                        if(j!=i){
                            for(var k=1; k<matriz.length; k++){
                                var indice=-1;
                                if(j<i)
                                    indice=j;
                                else if(j>i)
                                    indice=j-1;
                                nm[indice][k-1] = matriz[j][k];
                            }
                        }
                    }
                    if(i%2==0){                            
                        suma += matriz[i][0] * determinante(nm);                            
                    }                            
                    else{                            
                        suma -= matriz[i][0] * determinante(nm);
                    }                        
                }
                return suma;
            }
            
            function printMatriz(matriz){
                for(var i=0; i<matriz.length; i++){
                    document.write("[ ");
                    for(var j=0; j<matriz.length; j++){
                        document.write(matriz[i][j].toPrecision(precision) + " ");
                    }   
                    document.write(" ]<br/>");            
                }
            }

            $(document).ready(function(){
                $("#bt_add").click(function(event) {
                    exponentesx();                    
                });                
            });
            
            /* ---------------------------------- */            
          //  var precision = 9;
            /*
            var m = createMatriz(3);            
            m[0][0]=1;m[0][1]=0.3;m[0][2]=0.5;
            m[1][0]=0;m[1][1]=1;m[1][2]=0.5;
            m[2][0]=-0.1;m[2][1]=0.7;m[2][2]=1;
            */
            
            //definimos matriz y datos
            /*var m = createMatriz(5);            
            m[0][0]=0.3;m[0][1]=2.3;m[0][2]=3.3;m[0][3]=2;m[0][4]=2;
            m[1][0]=4;m[1][1]=5.4;m[1][2]=6;m[1][3]=3;m[1][4]=2;
            m[2][0]=9;m[2][1]=8;m[2][2]=2;m[2][3]=0.01;m[2][4]=2;
            m[3][0]=1;m[3][1]=0.1;m[3][2]=0.2;m[3][3]=3;m[3][4]=2;            
            m[4][0]=3;m[4][1]=0.1;m[4][2]=0.2;m[4][3]=3;m[4][4]=2;
            //calculamos y mostramos en pantalla
            document.write("Matriz <br/>");
            printMatriz(m);
            var d = determinante(m);
            console.log(m.length);
            document.write("determinante = " + d.toPrecision(precision) + "<br/>");
        */