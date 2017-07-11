var util = require ('util')

describe ("test main page", function(){

    beforeEach(function(){
       browser.get('http://firepoker.io/#/');
    });
    
    var main_page = require('../pages/main_page.js');
    
    //------------
    // TESTCASE #1
    //------------
    it ("test main page for layout", function(){
        
        var main_page = require('../pages/main_page.js');
        var is_picture = main_page.isPicturePresent();
        var title_text = main_page.getTitleText();
        var button_text = main_page.getButtonText();
        var is_twitter = main_page.isTwitterButtonPresent();
        var is_google = main_page.isGooglePlusButtonPresent();
        
        expect(is_picture).toBe(true);
        expect(title_text).toBe('Firepoker');
        expect(button_text).toBe('Play now');
        expect(is_twitter).toBe(true);
        expect(is_google).toBe(true);
    });
    
    //------------
    // TESTCASE #2
    //------------
    it ("test pressing “Play now” button", function(){
        
        var create_new_game_page = main_page.clickPlayNowButton();
        expect(create_new_game_page.getTitleText()).toBe('Create a new game');
    });
    
    describe ("test create new game page", function() {
        
        beforeEach(function(){
            main_page.clickPlayNowButton()
            var user_field = create_new_game_page.getUsernameField()
            user_field.clear()
        });
    
        var create_new_game_page = require('../pages/create_new_game_page.js');
        
        //------------
        // TESTCASE #3
        //------------
        it ("test creating new game when all fields are filled", function() {
            
            create_new_game_page.enterUsername('Username');
            create_new_game_page.enterGamename('New Game name');
            create_new_game_page.enterGameDesc('New Game description');
            create_new_game_page.enterStories('Story 1\nStory 2\nStory 3');
            
            var game_page = create_new_game_page.clickCreateGameButton();
            
            // can't verify whether notification is OK, because I couldn't handle bindings, I suppose.
            expect(browser.getCurrentUrl()).toContain('/games/');
            expect(browser.getCurrentUrl()).not.toContain('new');            
            expect(game_page.isStoryPresent('Story 1'));
            expect(game_page.isStoryPresent('Story 2'));
            expect(game_page.isStoryPresent('Story 3'));
            
        });
        
        //------------
        // TESTCASE #4
        //------------
        it ("test creating new game when mandatory fields are empty/filled with spaces, part 1", function() {
            
            create_new_game_page.enterUsername('');
            create_new_game_page.enterGamename('');
            var button_enabled = create_new_game_page.isBtnClickable();
            expect(button_enabled).toBe(false);
            
        });
        
        it ("test creating new game when mandatory fields are empty/filled with spaces, part 2", function() {
            
            create_new_game_page.enterUsername('       ');
            create_new_game_page.enterGamename('');
            var button_enabled = create_new_game_page.isBtnClickable();
            expect(button_enabled).toBe(false);
            
        });
        
        it ("test creating new game when mandatory fields are empty/filled with spaces, part 3", function() {
            
            create_new_game_page.enterUsername('Person name');
            create_new_game_page.enterGamename('      ');
            var button_enabled = create_new_game_page.isBtnClickable();
            expect(button_enabled).toBe(false);
            
        });
        
        it ("test creating new game when mandatory fields are empty/filled with spaces, part 4", function() {
            
            create_new_game_page.enterUsername('   ');
            create_new_game_page.enterGamename('Game name');
            var button_enabled = create_new_game_page.isBtnClickable();
            expect(button_enabled).toBe(false);
            
        });
        
        //------------
        // TESTCASE #5
        //------------
        it ("test canceling game creation", function() {
            
            create_new_game_page.enterUsername('Uncertain user');
            create_new_game_page.enterGamename('New Game name');
            create_new_game_page.enterGameDesc('New Game description: This game will be canceled!');
            create_new_game_page.enterStories('Story 1\nStory 2\nStory 3');
            
            var main_page = create_new_game_page.clickCancel();
            expect(main_page.getTitleText()).toBe('Firepoker');
            
        });
        
        //------------
        // TESTCASE #6
        //------------
        it ("test starting a new game round", function() {
            
            create_new_game_page.enterUsername('Username');
            create_new_game_page.enterGamename('New Game name');
            create_new_game_page.enterGameDesc('New Game description');
            create_new_game_page.enterStories('Story 1\nStory 2\nStory 3');
            
            var game_page = create_new_game_page.clickCreateGameButton();
            
            game_page.clickStory('Story 2');
            expect(game_page.isStoryPresent('Story 2')).toBe(false);
            
            var card_values = ['0', '1', '2', '4', '8', '16', '32', '64', '128', '?'];
            
            expect(element.all(by.css('.list-inline li')).count()).toBe(10);
            expect(element(by.linkText('0')).isPresent()).toBe(true);
            expect(element(by.linkText('1')).isPresent()).toBe(true);
            expect(element(by.linkText('2')).isPresent()).toBe(true);
            expect(element(by.linkText('4')).isPresent()).toBe(true);
            expect(element(by.linkText('8')).isPresent()).toBe(true);
            expect(element(by.linkText('16')).isPresent()).toBe(true);
            expect(element(by.linkText('32')).isPresent()).toBe(true);
            expect(element(by.linkText('64')).isPresent()).toBe(true);
            expect(element(by.linkText('128')).isPresent()).toBe(true);
            expect(element(by.linkText('?')).isPresent()).toBe(true);
            
            //expect(game_page.matchCardsValues(card_values)).toBe(true);
            
            expect(game_page.hasButton('Accept round')).toBe(true);
            expect(game_page.hasButton('Play again')).toBe(true);
            expect(game_page.hasButton('Reveal cards')).toBe(true);
            expect(game_page.hasButton('Cancel round')).toBe(true);
            
            expect(game_page.isBtnActive('Accept round')).toBe(true)
            expect(game_page.isBtnActive('Play again')).toBe(false)
            expect(game_page.isBtnActive('Reveal cards')).toBe(false)
            expect(game_page.isBtnActive('Cancel round')).toBe(true)
            
        });
        
        //------------
        // TESTCASE #7
        //------------
        it ("test round cancel after story deleting from a Story list during a game round", function() {
            create_new_game_page.enterUsername('Username');
            create_new_game_page.enterGamename('New Game name');
            create_new_game_page.enterGameDesc('New Game description');
            create_new_game_page.enterStories('Story 1\nStory 2\nStory 3');
            
            var game_page = create_new_game_page.clickCreateGameButton();
            
            game_page.clickStory('Story 2');
            game_page.deleteStory();
            game_page.clickButton('Cancel round');
            expect(game_page.isStoryPresent('Story 2'));
            expect(game_page.isStoryPresent('Story 3'));
        });
    
    }); 
    
});
