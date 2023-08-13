$("#contact").ready(function (){
    $(".alertDanger").hide()
    $(".alertSuccess").hide()
    $("#sendMessage").on("click" , function (e){
        e.preventDefault()
        const fullName = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        let html = '';
        let array
        if (!validateFullName(fullName)) {
            html += `<li>Unesite ispravno ime i prezime </li>`
            $("#name").addClass("border-danger")
        }else{
            $("#name").removeClass("border-danger")
        }

        if (!validateEmail(email)) {
            html += `<li> Unesite ispravan e-mail </li>`
            $("#email").addClass("border-danger")
        }else{
             $("#email").removeClass("border-danger")

        }
        if (!validateSubject(subject)) {
            html += `<li> Unesite ispravan naslov poruke </li>`
            $("#subject").addClass("border-danger")
        }else{
             $("#subject").removeClass("border-danger")

        }
        if (!validateMessage(message)) {
            html += `<li> Unesite ispravnu poruku </li>`
            $("#message").addClass("border-danger")
        }else{
             $("#message").removeClass("border-danger")

        }
        if(html !== ''){
            $(".alertDanger").show()
           document.getElementById("errorMessage").innerHTML = html;
           // $(".alertDanger").show()
            $(".alertSuccess").hide()
            // $("alert-dange").removeClass('d-none');
        }else{
            
            $.ajax({
                "method" : "POST",
                "url" : "contact.php",
                "dataType" : "json",
                "data" : {fullName, email, subject , message},
                "success" : function(data){
                        $(".alertDanger").hide()
                      $(".alertSuccess").show()
                } , 
                "error" : function(error) {
                     html += `<li class=" fw-bold"> Greška  </li>`
                     document.getElementById("errorMessage").innerHTML = html;
                      $(".alertDanger").show()
                      $(".alertSuccess").hide()
                }
            })
           
        }
    })
});

function validateFullName(fullName) {
    const fullNameRegex = /^(?!\s*$)[a-zA-Z\s]{2,100}$/;
    return fullNameRegex.test(fullName);
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validateSubject(subject) {
    const subjectRegex = /^(?!\s*$)[\s\S]{1,100}$/

    return subjectRegex.test(subject);
}

function validateMessage(message) {
    const messageRegex = /^(?!\s*$)[\s\S]{1,1000}$/
    return messageRegex.test(message);
}