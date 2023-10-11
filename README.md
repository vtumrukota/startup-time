This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



# Implementation Details

## neo4j
- Added Uniqueness constraints for each node type to avoid duplicate rows on upload
- Used console.log - normally would use cloud logging mechanism

### Obstacles
- Neo4j not merging properly with NULL values

-- create relationships:
<!-- ``
  MATCH (company:CompanyNode), (acquisition:CompanyAcquisitionNode)
  WHERE company.company_id = acquisition.acquired_company_id
  CREATE (company)-[:ACQUIRED_BY]->(acquisition)
``

``
  MATCH (company:CompanyNode), (employment:PersonEmploymentNode)
  WHERE company.company_id = employment.company_id
  CREATE (employment)-[:WORKS_AT]->(company)
``
``
MATCH (company:Company), (acquisition:CompanyAcquisition)
  WHERE company.company_id = acquisition.parent_company_id
  CREATE (company)-[:HAS_ACQUIRED]->(acquisition)
`` -->


<!-- ``
MATCH (company:Company), (employment:PersonEmployment)
WHERE company.company_id = employment.company_id AND NOT (employment.end_date IS NULL OR employment.end_date = "")
CREATE (employment)-[:WORKED_AT]->(company)
`` -->

- Company -> Current Employees
- Company -> Former Employees

- Company -> Been Acquired
- Company -> Has Acquired

- Employee -> Companies Worked for
- Employee -> Worked at Acquired Companies





Company -> CompanyAcquisitions (HAS_ACQUIRED)
```
MATCH (c:Company), (ca:CompanyAcquisition)
WHERE c.company_id = ca.parent_company_id
CREATE (c)-[:HAS_ACQUIRED]->(ca)
```

CompanyAcquistion -> Company (WAS_ACQUIRED)
```
MATCH (c:Company), (ca:CompanyAcquisition)
WHERE c.company_id = ca.acquired_company_id
CREATE (ca)-[:WAS_ACQUIRED]->(c)
```

// Search for all acquisitions of parent:
```
MATCH (parent:Company {company_name: 'Zynga'})-[:HAS_ACQUIRED]->(ca:CompanyAcquisition)-[:WAS_ACQUIRED]->(acquired:Company)
RETURN acquired
```


CompanyAcquisition -> Comapny (WAS_MERGED) // true

// all acquisitions who were merged 
```
MATCH (parent:Company)-[:HAS_ACQUIRED]->(ca:CompanyAcquisition {merged_into_parent_company: true})-[:WAS_ACQUIRED]->(acquired:Company)
RETURN acquired
```

Company -> CompanyAcqusitions -> Company (COMPANIES_ACQUIRED)


Company -> Employee (WORKERS)
```
MATCH (c:Company), (p:PersonEmployment)
WHERE c.company_id = p.company_id AND (p.end_date IS NULL OR p.end_date = "")
CREATE (c)-[:WORKERS]->(p)
```

Company -> Employee (OLD_WORKERS)
```
MATCH (c:Company), (p:PersonEmployment)
WHERE c.company_id = p.company_id AND NOT (p.end_date IS NULL OR p.end_date = "")
CREATE (c)-[:OLD_WORKERS]->(p)
```


Employee -> Company (WORKED_AT)
```
MATCH (c:Company), (p:PersonEmployment)
WHERE p.company_id = c.company_id AND NOT (p.end_date IS NULL OR p.end_date = "")
CREATE (p)-[:WORKS_FOR]->(c)
```


Employee -> Company (WORKS_FOR) // current
```
MATCH (c:Company), (p:PersonEmployment)
WHERE p.company_id = c.company_id AND (p.end_date IS NULL OR p.end_date = "")
CREATE (p)-[:WORKS_FOR]->(c)
```

*** Assume no start date is current employee