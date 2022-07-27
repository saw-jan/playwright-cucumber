Feature: example feature file

  Scenario: example scenario
    Given navigated google.com
    When I search "JankariTech"
    Then I should see search list
  