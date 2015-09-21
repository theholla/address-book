$(document).ready(function() {

/* Form to add an additional address to a contact */
  $("#add-address").click(function() {
      $(".new-address").append('<div class="new-address">' +
                                  '<div class="form-group">' +
                                  '<label for="new-street">Street</label>'+
                                  '<input type="text" class="form-control new-street">' +
                                  '</div>' +
                                  '<div class="form-group">' +
                                    '<label for="new-city">City</label>' +
                                    '<input type="text" class="form-control new-city">' +
                                  '</div>' +
                                  '<div class="form-group">' +
                                    '<label for="new-state">State</label>' +
                                    '<input type="text" class="form-control new-state">' +
                                   '</div>' +
                                '</div>');
  });

/* Form to add a contact */
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = { firstName: inputtedFirstName, lastName: inputtedLastName, addresses: [] };

    /* Add a contact's address */
    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = { street: inputtedStreet, city: inputtedCity, state: inputtedState };

      newContact.addresses.push(newAddress);
    });

    /* Hidden form to add a second address or update information */
    $(".second-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var secondAddress = { street: inputtedStreet, city: inputtedCity, state: inputtedState };

    newContact.addresses.push(secondAddress);
    });

    /*Routing new contact information to web site*/
    $("ul#contacts").append("<li><span class='contact'>" + newContact.firstName + "</span></li>");


    /* Show information for the contact that is clicked */
    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);

      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.street + ", " + address.city + ", " +       address.state + "</li>");
      });
    });

    /* Clears the form after the contact is added */
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");

  });//closes form new-contact
});
