# Software Requirements Specification (SRS)

## 1. Why SRS

### Goals:

* software customers to accurately describe what they wish to obtain
* software suppliers to understand exactly what the customer wants
* individuals to accomplish the following goals:
  * develop a standard software requirements specification outline for their own organizations
  * define the format and content of their specific software requirements specifications
  * develop additional local supporting items such as an SRS quality checklist, or an SRS writer's handbook

### Benefits

* Establish the basis for agreement between the customers and the suppliers on what the software product is to do
* Reduce the development effort
* Provide a basis for estimating costs and schedules
* Provide a baseline for validation and veriﬁcation
* Facilitate transfer
* Serve as a basis for enhancement

## 2. Consideration for producing a good SRS

### 2.1 Nature of the SRS

* Functionality
* External Interfaces
* Performance
* Attributes
* Design Constraints Imposed on an Implementation

Note: Avoid placing either design or project requirements in the SRS

### 2.2 Role of the SRS

* should correctly define all of the software requirements. A software requirement may exist because of the nature of the task to be solved or because of a special characteristic of the project.
* should not describe any design or implementation details. These should be described in the design stage of the project.
* should not impose additional constraints on the software. These are properly specified in other documents such as a software quality assurance plan.

### 2.3 Characteristics of a good SRS

* correct
* unambiguous
* complete
* consistent
* ranked for importance and / or stability
* verifiable
* modifiable
* traceable

### 2.4 Embedding

* Design Items:
  * Partitioning the software into modules
  * Allocating functions to the modules
  * Describing the flow of information or control between modules
  * Choosing data structure
* Security Requirements:
  * Keep certain functions in separate modules
  * Permit only limited communication between some areas of the program
  * Check data integrity for critical variables
* Project Requirements:
  * Cost
  * Delivery schedule
  * Reporting procedures
  * Software development methods
  * Quality assurance
  * Validation and verification criteria
  * Acceptance procedures

## 3. Parts of an SRS

```text
1. Introduction
		1.1 Purpose
		1.2 Scope
		1.3 Definitions, Acronyms, and Abbreviations
		1.4 References
		1.5 Overview
2. Overall Description
		2.1 Product Perspective
		2.2 Product Functions 
		2.3 User Characteristics
		2.4 Constraints
		2.5 Assumptions and Dependencies
3. Specific Requirements (by feature)
		3.1 External Interface Requirements
				3.1.1 User Interface
				3.1.2 Hardware Interfaces
				3.1.3 Software Interfaces
				3.1.4 Communications Interfaces
		3.2 Systems Features
		3.3 Performance Requirements
		3.4 Design Constraints
		3.5 Software System Attributes
		3.6 Other Requirements
Appendix
Index
```

<a href="./srs-template.md" download>Download Template</a>

## Reference

IEEE 830: http://www.math.uaa.alaska.edu/~afkjm/cs401/IEEE830.pdf

