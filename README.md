# README

This app lets you keep score of all your board games (or any games), and look back at any session of a game to see who won that time!

This app is deployed at https://tabletoptally.fly.dev/.

On the home page, you can see all games that any user has added to the database, along with details:
![CleanShot 2023-11-06 at 16 27 11@2x](https://github.com/usborn116/tally/assets/64931297/d6127a63-e973-4e96-b717-a1504d52d87d)

To view the games you've added, go to the My Games page. There, you can also search for a specific game:
![CleanShot 2023-11-06 at 16 27 31](https://github.com/usborn116/tally/assets/64931297/d9b2506a-5199-404c-8a28-0e28c2aef0eb)

You can also create a new game here. For the Image URL, I'd suggest copying the direct image URL (it should end in an image file extension, like .jpg) from a place like Boardgamegeek.com:
![CleanShot 2023-11-06 at 16 29 23@2x](https://github.com/usborn116/tally/assets/64931297/ae8e7df8-0410-4bc2-a88e-f0da6f4d6ef4)

You can see your user information in the Profile page:
![CleanShot 2023-11-06 at 16 27 42@2x](https://github.com/usborn116/tally/assets/64931297/4845c8fa-4011-4dbb-932c-ba5850ae81bd)

When you click on a game, you can see the game details, the leaderboard for that game, and all previous sessions for that game (sorted by most recent):
![CleanShot 2023-11-06 at 16 29 11@2x](https://github.com/usborn116/tally/assets/64931297/97584cbf-8358-4ec1-ae00-bc3d77fb4432)

Clicking "New Session" will create a session for you. You can click into that session to edit the date, view details, and add players to that session:
![CleanShot 2023-11-06 at 16 28 14](https://github.com/usborn116/tally/assets/64931297/9082854b-6251-40e7-a063-d2ce950fe5b3)

Once you're done with a game, add the scores!
![CleanShot 2023-11-06 at 16 28 41](https://github.com/usborn116/tally/assets/64931297/ca40ad37-1ab9-4778-90c6-c0eade9f3777)

If the game has categories that aren't score-based but just win-based, you can check boxes for those categories too:
![CleanShot 2023-11-06 at 16 29 48](https://github.com/usborn116/tally/assets/64931297/753c8a22-a166-4360-92e4-e22f8786d6ee)


# tally

Docs that were helpful in the making of this project:

- RSpec "before" documentation: https://www.rubydoc.info/gems/rspec-core/RSpec%2FCore%2FHooks:before
- Setting default RSpec formatting: https://stackoverflow.com/questions/40023188/can-i-set-rspec-format-documentation-as-the-default
- RSpec Rails documentation: https://github.com/rspec/rspec-rails
- ActiveRecord callbacks: https://guides.rubyonrails.org/active_record_callbacks.html#creating-an-object
- Default sort order for associations: https://stackoverflow.com/questions/36221631/set-default-order-of-a-has-many-resource-at-the-active-record-level
- Handle non-click events in React: https://legacy.reactjs.org/docs/handling-events.html
- Using SASS in Rails: https://stackoverflow.com/questions/73417883/loaderror-cannot-load-such-file-sassc
- HTML Events: https://www.w3schools.com/jsref/dom_obj_event.asp
- CSS Media queries: https://stackoverflow.com/questions/66045259/css-grid-two-columns-on-desktop-and-1-column-on-mobile
- Rails Nested Forms: https://www.ombulabs.com/blog/learning/rails/nested-forms.html
- Git branching: https://www.w3schools.com/git/git_branch_merge.asp?remote=github

Jest Testing Help:

- Jest and React Hooks: https://vaskort.medium.com/how-to-unit-test-your-custom-react-hook-with-react-testing-library-and-jest-8bdefafdc8a2
- Testing React Apps: https://jestjs.io/docs/tutorial-react
- React Testing Library: https://testing-library.com/docs/
- React Testing Library guide: https://testing-library.com/docs/react-testing-library/intro
- DOM Manipulation: https://jestjs.io/docs/tutorial-jquery
- Jest Docs: https://jestjs.io/docs/api
- Testing UseState: https://allmaddesigns.com/test-react-usestate-with-jest/
- Mocking hooks in components: https://dev.to/mbarzeev/mocking-data-fetching-react-hooks-nn5
- Accessible Roles: https://www.w3.org/TR/html-aria/#docconformance
- ByRole docs: https://testing-library.com/docs/queries/byrole
- UserEvent: https://testing-library.com/docs/user-event/v13/#typeelement-text-options
- Jest Setup: https://jestjs.io/docs/setup-teardown
- Info on act(..) in React testing: https://github.com/threepointone/react-act-examples/blob/master/sync.md

Styling:
- If I ever want to do toggles instead of checkboxes: https://www.w3schools.com/howto/howto_css_switch.asp
- Centering blocks: https://css-tricks.com/quick-css-trick-how-to-center-an-object-exactly-in-the-center/
