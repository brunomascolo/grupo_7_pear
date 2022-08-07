window.addEventListener("load", function(){
    console.log("Trabajando")
    let formularioLogin = document.querySelector("form.login")
    formularioLogin.addEventListener("submit", function(e){
        e.preventDefault();
        let validarCorreo =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        let correo = document.querySelector("input.email");
        let password = document.querySelector("input.password")
        let errorBack = document.querySelector("input.errorLogin")
        if(correo.value == ""){
            swal("Atención!", "Debes ingresar un correo.", "info");
        } else if(!validarCorreo.test(correo.value)){
            swal("Atención!", "Debes ingresar un correo valido.", "info");
        }else if (password.value == ""){
            swal("Atención!", "Debes una contraseña.", "info");
        }else{
            formularioLogin.submit();
        }
    })
})