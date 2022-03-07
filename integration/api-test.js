describe("api test", function(){
    before(function (){
        cy.fixture('comments').then((comments) =>{
            this.comments=comments;
        })
    })

    it("comments api test", function () {
       cy.request("https://jsonplaceholder.cypress.io/comments")
       .should((resp) =>{
           expect(resp.status).to.eq(200);
           expect(resp.body).to.have.length(500);
           const body = resp.body[0];
           
           this.comments.attributes.forEach((name) =>{
               cy.log(name);
               expect(body.hasOwnProperty(name)).to.eq(true);
           })
       })
    })
}) 