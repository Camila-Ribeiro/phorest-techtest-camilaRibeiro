let validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
let validatePhone = (searchInput) => (String(searchInput).match(/^\d/)) ? true : false
let clientId = document.getElementById("client_id");
let branchId = document.getElementById("branch_id");

describe("Phorest Web Application Test", () => {

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

        it("should exist", () => {
            expect($("search_btn")).toBeDefined();
        }); 

        it("should trigger click on Search button", () => {
            let spyEvent = spyOnEvent('#search_btn', 'click');
            $('#search_btn').click();
            expect('click').toHaveBeenTriggeredOn('#search_btn');
            expect(spyEvent).toHaveBeenTriggered();
        });
     
        it("should display message error when input is empty or null", () => {
            $("#search_btn").click();
            let searchInput = $("#search_btn").value;
            let searchInputError = document.getElementById("search_input_error");
            if (searchInput == "" ||  searchInput == null) {
                searchInputError.classList.add("d-none");
                expect(searchInput).toHaveValue();
                expect(searchInputError).toHaveClass("d-none");
            } 
        });

        it("should return false when user have inserted an invalid email", () => {
            const invalidEmail = 'camila@';
            let resultEmail = validateEmail(invalidEmail);
            expect(resultEmail).toEqual(false);
        });

        it("should return true when user have inserted an valid email", () => {
            const validEmail = 'camila@phorest.com';
            let resultEmail = validateEmail(validEmail);
            expect(resultEmail).toEqual(true);
        });

        it("should validate phone number input as valid", () => {
            const validPhoneNumber = 123456789;
            let validResultNumber = validatePhone(validPhoneNumber);
            expect(validResultNumber).toEqual(true);
            
        });

        it("should validate phone number input as invalid", () => {
            const invalidPhoneNumber = "abcd";
            let invalidResultNumber = validatePhone(invalidPhoneNumber);
            expect(invalidResultNumber).toEqual(false);
        });
    });

    describe("Add Voucher", () => {
        beforeEach(() => {
            setFixtures(`
            <div id="add_voucher_error" class="w-75 mx-auto text-center alert alert-danger mt-5 d-none"><small>This voucher cannot be created!</small>
            </div>
            <input type="hidden" id="client_id" value="">
            <input type="hidden" id="branch_id" value="">
            `);
        });

        it("should exist", () => {
            expect($("add_voucher")).toBeDefined();
        }); 

        it("should display voucher form when click on Add Voucher button", () => {
            $("#add_voucher").click();
            let voucherForm = $("#voucher_form");
            
            let displayFormVoucher = (name, branch, client) => {
                let addVoucherError = document.getElementById("add_voucher_error");
                clientId.value = client;
                branchId.value = branch;
            
                if (branchId.value == "undefined" || branchId.value.length === 0) {
                    expect(addVoucherError).not.toHaveClass("d-none");
                    setTimeout(function() {
                        expect(addVoucherError).toHaveClass("d-none");
                        done();
                    }, 5000);
                }else{
                    nameOnVoucher.value = name;
                    expect(voucherForm).not.toHaveClass("d-none");
                    spyOn('voucherForm', 'scrollIntoView').and.callThrough();
                    expect('voucherForm', 'scrollIntoView').toHaveBeenCalled();
                }
                expect(displayFormVoucher).not.toHaveClass("d-none");
            }
        });    
    });
    
    describe("Create Voucher", () => {

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

        it("should exist", () => {
            expect($("create_voucher")).toBeDefined();
        });
        
        it("should trigger click on create voucher button", () => {
            let spyEvent = spyOnEvent('#create_voucher', 'click');
            $('#create_voucher').click();
            expect('click').toHaveBeenTriggeredOn('#create_voucher');
            expect(spyEvent).toHaveBeenTriggered();
        });
    });

    describe("Message Success", () => {
        beforeEach(() => {
            setFixtures(`
            <div class="w-50 mx-auto text-center alert alert-success" id="message_success" role="alert">
                Voucher was successfully created!
            </div>
            `);
        });

        it("should display message success when voucher is successfully created", () => {
            let messageSuccess = $("#message_success");
            let clientsContainer = $("#display_clients");
            let voucherContainer = $("#voucher_form");
            expect(messageSuccess).not.toHaveClass("d-none");
            expect(clientsContainer).not.toExist()
            expect(voucherContainer).not.toExist()
        });
        
    });

}); //CLOSE FIRST DESCRIBE