# PostgreSQL as the database

Content types (Projects, Articles, Media Items) are well-defined with stable, structured fields. PostgreSQL's relational model is a natural fit — strong querying, reliable ordering, and no need for the schema flexibility a document store provides. MongoDB was considered but rejected because the content schema is not expected to vary significantly across records.
