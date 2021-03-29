describe("Phorest Web Application Test", () => {

    // it("should be a number", () => {
    //     expect("2019").toBe(2019);
    // })

    

    beforeEach(() => {
        setFixtures(`
        <div class="container">
        <h1 class="title text-center">Create Voucher</h1>
        <div class="input-group mt-5 w-75 mx-auto">
            <input id="search_input" type="text" class="form-control " placeholder="Search Clients" aria-label="search clients" aria-describedby="search_input">
            <div class="input-group-append">
                <button id="search_btn" class="btn btn-custom w-100 text-uppercase" type="button">Search</button>
            </div>
        </div>
        <div id="search_input_error" class="w-50 mx-auto text-center alert alert-danger d-none"><small>Please enter a valid phone number or e-mail address.</small>
        </div>
    </div>
        `);
    });

    describe("The Search Button", () => {

        beforeEach(() => {
            $("#search_btn").click();
            let searchInput = $("#search_btn").value;
            let searchInputError = document.getElementById("search_input_error");
            
            if (searchInput == "" ||  searchInput == null) {
                searchInputError.classList.add("d-none");
                expect(searchInput).toHaveValue();
                expect(searchInputError).toHaveClass("d-none");
            } 
        });

        it("should trigger click on Search button", () => {
            let spyEvent = spyOnEvent('#search_btn', 'click');
            $('#search_btn').click();
            expect('click').toHaveBeenTriggeredOn('#search_btn');
            expect(spyEvent).toHaveBeenTriggered();
        });

        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        it("should return false when user is called with an invalid email", () => {
            const invalidEmail = 'camila@';
            let resultEmail = validateEmail(invalidEmail);
            expect(resultEmail).toEqual(false);
        });

        it("should return true when user is called with an valid email", () => {
            const validEmail = 'camila@phorest.com';
            let resultEmail = validateEmail(validEmail);
            expect(resultEmail).toEqual(true);
        });

        function validatePhone(searchInput) {
            if (String(searchInput).match(/^\d/)) {
                return true;
            }else{
                return false;
            } 
        }
        it("should validate phone number input as valid", () => {
            const validPhoneNumber = 123456789;
            let validResultNumber = validatePhone(validPhoneNumber);
            expect(validResultNumber).toEqual(true);
            
        });

        it("should validate phone number input as invalid7", () => {
            const invalidPhoneNumber = "abcd";
            let invalidResultNumber = validatePhone(invalidPhoneNumber);
            expect(invalidResultNumber).toEqual(false);
            
        });

        // it("should display list of clients", () => {
        //     let displayClients = $("#display_clients");
        //     expect(displayClients).toHaveClass("d-none");
            
        // });
    });

    describe("Trigger Button Click", () => {
        it("should trigger a button click on enter key", () => {
            $('#search_btn').triggerHandler('keyup');
        });
    });

    describe("Add Voucher", () => {
        beforeEach(() => {
            setFixtures(`
            <td class="text-center">
                <button class="btn btn-custom text-uppercase" id="add_voucher">Add Voucher</button>
            </td>
            `);
        });

        it("should trigger click on Add Voucher button", () => {
            let spyEvent = spyOnEvent('#add_voucher', 'click');
            $('#add_voucher').click();
            expect('click').toHaveBeenTriggeredOn('#add_voucher');
            expect(spyEvent).toHaveBeenTriggered();
        });

        it("should exist", () => {
            expect($("add_voucher")).toBeDefined();
        });

        it("display the form", () => {
            $("#add_voucher").click();
            let voucherForm = $("#voucher_form");
            // let addVoucher = $("#add_voucher");
            expect(voucherForm).not.toHaveClass("d-none");
        });
            
    });
    
    describe("Create Voucher", () => {
        // let body;

        beforeEach(() => {
            setFixtures(`
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                <span class="input-group-text">€</span>
                </div>
                <input type="number" class="form-control" id="voucher_input" aria-label="Amount (to the nearest dollar)">
                <div class="input-group-append">
                <span class="input-group-text">.00</span>
                </div>
            </div>
            <small class="form-text text-muted">Please insert the required amount</small>
            </div>
            <div class="w-75">
                <button type="button" class="btn btn-custom w-100 text-uppercase" id="create_voucher">Create Voucher</button>
            </div>
            `);
         
        });

        it("should trigger click on Create Voucher button", () => {
            let spyEvent = spyOnEvent('#create_voucher', 'click');
            $('#create_voucher').click();
            expect('click').toHaveBeenTriggeredOn('#create_voucher');
            expect(spyEvent).toHaveBeenTriggered();
        });

        it("should exist", () => {
            expect($("create_voucher")).toBeDefined();
        });

        // it("should matches objects with the expect key/value pairs", function() {
         
        //     let retrieveClientId = clientId.value;
        //     let retrieveBranchId = branchId.value;
        //     let getDecimalValue = parseFloat(voucherInput).toFixed(2);
        //     let body = 
        //     JSON.stringify({
        //         clientId: retrieveClientId,
        //         creatingBranchId: retrieveBranchId,
        //         issueDate : moment(),
        //         expiryDate : moment().add(1, 'years'),
        //         originalBalance : getDecimalValue
        //     });
        //     expect(body).toEqual(jasmine.objectContaining({
        //         clientId: retrieveClientId,
        //         creatingBranchId: retrieveBranchId,
        //         issueDate : moment(),
        //         expiryDate : moment().add(1, 'years'),
        //         originalBalance : getDecimalValue
        //     }));
            
        //   });

        
    });

    describe("Message Success", () => {
        beforeEach(() => {
            setFixtures(`
            <div class="w-50 mx-auto text-center alert alert-success" id="message_success" role="alert">
                Voucher was successfully created!
            </div>
            `);
        });

        it("should display message success", () => {
            let messageSuccess = $("#message_success");
            let clientsContainer = $("#display_clients");
            let voucherContainer = $("#voucher_form");
            expect(messageSuccess).not.toHaveClass("d-none");
            // expect(clientsContainer).toBeHidden()
            // expect(voucherContainer).remove();
        });
    });

    describe("Get List Of Clients", () => {
        beforeEach(() => {
            setFixtures(`
            <div class="container-fluid">
                <div class="clients-table d-none" id="display_clients">
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Email</th>
                            <th scope="col" class="th-voucher">Voucher</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td id="first_name"></td>
                            <td id="last_name"></td>
                            <td id="mobile"></td>
                            <td id="email"></td>
                            <td class="text-center">
                                <button class="btn btn-custom text-uppercase" id="add_voucher">Add Voucher</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <input type="hidden" id="client_id" value="">
                    <input type="hidden" id="branch_id" value="">
                </div>
            </div>
            `);
        });

        it("should display client's list from database", () => {
            
            
        });
    });

    describe("Get Clients API", () => {
        beforeEach(() => {
            
        });

        it("should send request", () => {
           
        });
    });

    describe("Get Voucher API", () => {
        beforeEach(() => {
            
        });

        it("should post request", () => {
           
        });
    });

}); //CLOSE FIRST DESCRIBE