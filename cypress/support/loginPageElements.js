import loginData from '../fixtures/loginData.json';

class loginPage{
    
    visit(){cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');}
    
    inputUsername(username){cy.get('input[name="username"]').type(username);}
    
    inputPassword(password){cy.get('input[name="password"]').type(password);}
   
    clickloginButton(){cy.get('button[type="submit"]').click();}

    interceptLocations(){cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations').as('locations');}

    interceptValidate(){cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('validate');}

    interceptResetPW(){cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').as('passwordReset');}
                     
    getResetPW(){cy.get('@passwordReset');}

    waitLocations(){cy.wait('@locations');}

    waitValidate(){cy.wait('@validate');}
   
    loginvalidcreds(){cy.url().should('include', '/dashboard');}

    unameReqMessage(){cy.get('input[name="username"]')
                        .parents('.oxd-input-group')
                        .find('.oxd-input-field-error-message')
                        .should('have.text', 'Required');}

    bothUPnotvalidMessage(){cy.get('input[name="username"]')
                              .parents('.oxd-input-group')
                              .find('.oxd-input-field-error-message')
                              .should('have.text', 'Required')
                            cy.get('input[name="username"]')
                              .parents('.oxd-input-group')
                              .find('.oxd-input-field-error-message')
                              .should('have.text', 'Required');}

    psswdReqMessage(){cy.get('input[name="password"]')
                        .parents('.oxd-input-group')
                        .find('.oxd-input-field-error-message')
                        .should('have.text', 'Required');}

    unameinvalMessage(){cy.get('.oxd-alert-content-text')
                        .should('be.visible')
                        .and('contain', 'Invalid credentials');}

    psswdinvalMessage(){cy.get('.oxd-alert-content-text')
                        .should('be.visible')
                        .and('contain', 'Invalid credentials');}

    forgotLinkClick(){cy.contains('Forgot your password?')
                        .should('be.visible')
                        .click();}
                      
    checkForgoturl(){cy.url().should('include', '/requestPasswordResetCode')
                     cy.contains('Reset Password')
                     .should('be.visible');}

    ohrmlink(){cy.contains('OrangeHRM, Inc').should('have.attr', 'href')
                 .and('include', 'orangehrm.com');}
    
    linkedinIcon(){cy.get('a[href="https://www.linkedin.com/company/orangehrm/mycompany/"]')
                     .should('be.visible');}

    youtubeIcon(){cy.get('a[href="https://www.youtube.com/c/OrangeHRMInc"]')
                     .should('be.visible');}         
                     
    xIcon(){cy.get('a[href="https://twitter.com/orangehrm?lang=en"]')
                     .should('be.visible');} 

    facebookIcon(){cy.get('a[href="https://www.facebook.com/OrangeHRM/"]')
                     .should('be.visible');} 

}
export default new loginPage();