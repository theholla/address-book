function Contact(firstName,lastName){
  this.firstName = firstName;
  this.lastName = lastName;
  this.addresses = [];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Address(addressType, street, city, state) {
  this.addressType = addressType;
  this.street = street;
  this.city = city;
  this.state = state;
}

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}

Address.prototype.getAddressType = function() {
  return this.addressType;
}

function showInitialForm() {
  $("div.new-address").not("div.new-address:nth-child(1)").remove();
};

/* Clears the form after user clicks submit */
function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
}

$(document).ready(function() {

/* Form to add an additional address to a contact */
  $("#add-address").click(function() {
      $(".new-address").append('<div class="new-address">' +
                                  '<div class="form-group">' +
                                    '<label for="new-address-type">Home, Work, or Mailing?</label>' +
                                    '<input type="text" class="form-control new-street" placeholder="home">' +
                                  '</div>' +
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
    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    /* Add a contact's address */
    $(".new-address").each(function() {
      var inputtedAddressType = $(this).find("input.new-address-type").val();
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedAddressType, inputtedStreet, inputtedCity, inputtedState);

      newContact.addresses.push(newAddress);
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    /* Show information for the contact that is clicked */
    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);

      $("ul#addresses").text("");

      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.getAddressType() + " Address: " + address.fullAddress() + "</li>");
      });
    });

    /* Delete extra address fields after submit */
    showInitialForm();

    /* Clears the form after the contact is added */
    resetFields();

  });
});
