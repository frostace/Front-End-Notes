1. Introduction
    * 1.1 Purpose
	  * Delineate the purpose of the SRS
	  * Specify the intended audience for the SRS
      
	* 1.2 Scope
	  
	  * Identify the software product(s) to be produced by name (e.g., Host DBMS, Report Generator, etc.)
      
      * Explain what the software product(s) will, and, if necessary, will not do
      
      * Describe the application of the software being speciÞed, including relevant beneÞts, objectives, and goals
      
      * Be consistent with similar statements in higher-level speciﬁcations (e.g., the system requirements
      
        speciﬁcation), if they exist
      
    * 1.3 Definitions, Acronyms, and Abbreviations
    
      This subsection should provide the deﬁnitions of all terms, acronyms, and abbreviations required to properly
    
      interpret the SRS. This information may be provided by reference to one or more appendixes in the SRS or
    
      by reference to other documents.
    
    * 1.4 References
    
      * Provide a complete list of all documents referenced elsewhere in the SRS;
    
      * Identify each document by title, report number (if applicable), date, and publishing organization;
    
      * Specify the sources from which the references can be obtained.
    
    * 1.5 Overview
    
      * Describe what the rest of the SRS contains;
    
      * Explain how the SRS is organized.
2. Overall Description
   * 2.1 Product Perspective
   
     This subsection of the SRS should put the product into perspective with other related products. If the product
   
     is independent and totally self-contained, it should be so stated here. If the SRS deﬁnes a product that is a
   
     component of a larger system, as frequently occurs, then this subsection should relate the requirements of
   
     that larger system to functionality of the software and should identify interfaces between that system and the
   
     software.
   
     * a) System Interfaces
   
       This should list each system interface and identify the functionality of the software to accomplish the system requirement and the interface description to match the system.
   
     * b) User Interfaces
   
       * The logical characteristics of each interface between the software product and its users.
   
         This includes those conﬁguration characteristics (e.g., required screen formats, page or window layouts, content of any reports or menus, or availability of programmable function keys) necessary to accomplish the software requirements.
   
       * All the aspects of optimizing the interface with the person who must use the system.
   
         This may simply comprise a list of do's and don'ts on how the system will appear to the user. One example may be a requirement for the option of long or short error messages. Like all others, these requirements should be veriﬁable, e.g., "a clerk typist grade 4 can do function X in Z min after 1 h of training" rather than "a typist can do function X." (This may also be speciﬁed in the Software System Attributes under a section titled Ease of Use.)
   
     * c) Hardware Interfaces
   
       This should specify the logical characteristics of each interface between the software product and the hardware components of the system. This includes conﬁguration characteristics (number of ports, instruction sets, etc.). It also covers such matters as what devices are to be supported, how they are to be supported, and protocols. For example, terminal support may specify full-screen support as opposed to line-by-line support.
   
     * d) Software Interfaces
   
       This should specify the use of other required software products (e.g., a data management system, an operating system, or a mathematical package), and interfaces with other application systems (e.g., the linkage between an accounts receivable system and a general ledger system). For each required software product, the following should be provided:
   
       ||Name|Mnemonic|Specification Number|Version Number|Source|Interface<br />* Purpose of interfacing software<br />* Definition of Interface|
       |---|---|---|---|---|---|---|
       ||||||||
   
     * e) Communications Interfaces
   
       This should specify the various interfaces to communications such as local network protocols, etc.
   
     * f) Memory
   
       This should specify any applicable characteristics and limits on primary and secondary memory.
   
     * g) Operations
   
       This should specify the normal and special operations required by the user such as
   
       * a) The various modes of operations in the user organization (e.g., user-initiated operations);
   
       * b) Periods of interactive operations and periods of unattended operations;
   
       * c) Data processing support functions;
   
       * d) Backup and recovery operations.
   
     * h) Site Adaptation Requirements
   
       This should
   
       * a) Deﬁne the requirements for any data or initialization sequences that are speciﬁc to a given site,
   
       mission, or operational mode (e.g., grid values, safety limits, etc.)
   
       * b) Specify the site or mission-related features that should be modiﬁed to adapt the software to a particular installation
   
   * 2.2 Product Functions
   
     This subsection of the SRS should provide a summary of the major functions that the software will perform.
   
     For example, an SRS for an accounting program may use this part to address customer account maintenance,
   
     customer statement, and invoice preparation without mentioning the vast amount of detail that each of those
   
     functions requires.
   
     Sometimes the function summary that is necessary for this part can be taken directly from the section of the
   
     higher-level speciﬁcation (if one exists) that allocates particular functions to the software product. Note that
   
     for the sake of clarity
   
     * a) The functions should be organized in a way that makes the list of functions understandable to the
   
     customer or to anyone else reading the document for the ﬁrst time.
   
     * b) Textual or graphical methods can be used to show the different functions and their relationships.
   
     Such a diagram is not intended to show a design of a product, but simply shows the logical relationships
   
     among variables.
   
   * 2.3 User Characteristics
   
     This subsection of the SRS should describe those general characteristics of the intended users of the product
   
     including educational level, experience, and technical expertise. It should not be used to state speciﬁc
   
     requirements, but rather should provide the reasons why certain speciﬁc requirements are later speciﬁed in
   
     Section 3 of the SRS.
   
   * 2.4 Constraints
   
     This subsection of the SRS should provide a general description of any other items that will limit the developer
   
     's options. These include
   
     * a) Regulatory policies;
   
     * b) Hardware limitations (e.g., signal timing requirements);
   
     * c) Interfaces to other applications;
   
     * d) Parallel operation;
   
     * e) Audit functions;
   
     * f) Control functions;
   
     * g) Higher-order language requirements;
   
     * h) Signal handshake protocols (e.g., XON-XOFF, ACK-NACK);
   
     * i) Reliability requirements;
   
     * j) Criticality of the application;
   
     * k) Safety and security considerations.
   
   * 2.5 Assumptions and Dependencies
   
     This subsection of the SRS should list each of the factors that affect the requirements stated in the SRS.
   
     These factors are not design constraints on the software but are, rather, any changes to them that can affect
   
     the requirements in the SRS. For example, an assumption may be that a speciﬁc operating system will be
   
     available on the hardware designated for the software product. If, in fact, the operating system is not available,
   
     the SRS would then have to change accordingly.
3. Specific Requirements (by feature)
   * 3.1 External Interface Requirements
     
      * 3.1.1 User Interface
      * 3.1.2 Hardware Interfaces
      * 3.1.3 Software Interfaces
      * 3.1.4 Communications Interfaces
      
      This should be a detailed description of all inputs into and outputs from the software system. It should
      
      complement the interface descriptions in [part 2](#2. Overall Description) and should not repeat information there.
      
      It should include both content and format as follows:
      
      * a) Name of item
      
      * b) Description of purpose
      
      * c) Source of input or destination of output
      
      * d) Valid range, accuracy, and/or tolerance
      
      * e) Units of measure
      
      * f) Timing
      
      * g) Relationships to other inputs/outputs
      
      * h) Screen formats/organization
      
      * i) Window formats/organization
      
      * j) Data formats
      
      * k) Command formats
      
      * l) End messages
      
   * 3.2 System Features

      A feature is an externally desired service by the system that may require a sequence of inputs to effect the

      desired result. For example, in a telephone system, features include local call, call forwarding, and conference

      call. Each feature is generally described in a sequence of stimulus-response pairs. When organizing this

      section by feature, the outline in A.5 should be used.

      Stimulus: Some systems can be best organized by describing their functions in terms of stimuli. For example, the functions of an automatic aircraft landing system may be organized into sections for loss of power, wind shear, sudden change in roll, vertical velocity excessive, etc. When organizing this section by stimulus, the outline in A.6 should be used.

      Response: Some systems can be best organized by describing all the functions in support of the generation of a response. For example, the functions of a personnel system may be organized into sections corresponding to all functions associated with generating paychecks, all functions associated with generating a current list of

      employees, etc. The outline in A.6 (with all occurrences of stimulus replaced with response) should be used.

      * 3.2.1 System Feature 1

        * Introduction/Purpose of Feature
        * Stimulus/Response Sequence
        * Associated functional requirements
          * Functional Requirement 1
          * Functional Requirement 2
          * ...
          * Functional Requirement i

      * 3.2.2 System Feature 2

        ...

   * 3.3 Performance Requirements

      This subsection should specify both the static and the dynamic numerical requirements placed on the software

      or on human interaction with the software as a whole. Static numerical requirements may include the following:

      * a) The number of terminals to be supported

      * b) The number of simultaneous users to be supported

      * c) Amount and type of information to be handled

      ```text
      Numerical Requirements should be stated in measurable terms.
      For example:
      		95% of the transactions shall be processed in less than 1 s.
      rather than:
      		An operator shall not have to wait for the transaction to complete.
      ```

   * 3.4 Design Constraints

      This should specify design constraints that can be imposed by other standards, hardware limitations, etc.

   * 3.5 Software System Attributes

      There are a number of attributes of software that can serve as requirements. It is important that required

      attributes be speciﬁed so that their achievement can be objectively veriﬁed. Subclauses 3.5.1 through

      3.5.5 provide a partial list of examples.

      * 3.5.1 Reliability

        This should specify the factors required to establish the required reliability of the software system at time of delivery.

      * 3.5.2 Availability

        This should specify the factors required to guarantee a deﬁned availability level for the entire system such as checkpoint, recovery, and restart.

      * 3.5.3 Security

        This should specify the factors that protect the software from accidental or malicious access, use, modiﬁcation, destruction, or disclosure. Speciﬁc requirements in this area could include the need to

        * a) Utilize certain cryptographical techniques;

        * b) Keep speciﬁc log or history data sets;

        * c) Assign certain functions to different modules;

        * d) Restrict communications between some areas of the program;

        * e) Check data integrity for critical variables.

      * 3.5.4 Maintainability

        This should specify attributes of software that relate to the ease of maintenance of the software itself. There may be some requirement for certain modularity, interfaces, complexity, etc. Requirements should not be placed here just because they are thought to be good design practices.

      * 3.5.5 Portability

        This should specify attributes of software that relate to the ease of porting the software to other host machines and/or operating systems. This may include the following:

        * a) Percentage of components with host-dependent code;

        * b) Percentage of code that is host dependent;

        * c) Use of a proven portable language;

        * d) Use of a particular compiler or language subset;

        * e) Use of a particular operating system.

   * 3.6 Other Requirements

Appendix
Index