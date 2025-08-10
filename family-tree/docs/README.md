# Family Tree Website Documentation

This directory contains the comprehensive documentation for the Family Tree Website project.

## Documentation Structure

Our documentation is organized into logical sections to make it easy to find the information you need:

- [Index](./index.md) - Main documentation hub with links to all sections
- [Project Overview](./project-overview.md) - Project summary, tech stack, and architecture
- [Task Tracking](./task-tracking.md) - Current tasks and their status
- [Completed Tasks](./completed-tasks.md) - Archive of finished tasks with implementation notes
- [Implementation Notes](./implementation-notes.md) - Technical implementation details and code examples
- [Success Criteria](./success-criteria.md) - Project goals and metrics for success
- [Onboarding & Help System](./onboarding-help.md) - Guided tour, contextual help, and shortcuts

## Documentation Best Practices

When updating this documentation, please follow these guidelines:

1. **Keep content focused**: Each file should cover a specific aspect of the project
2. **Maintain consistent formatting**: Use markdown headings consistently (# for title, ## for sections, etc.)
3. **Update regularly**: Documentation should be updated as tasks are completed
4. **Include examples**: Code examples should be included where relevant
5. **Use cross-references**: Link between documents to create a cohesive structure

## Quick Links

- [Current Sprint Status](./task-tracking.md#current-sprint)
- [Tech Stack Overview](./project-overview.md#%EF%B8%8F-tech-stack--architecture)
- [Implementation Guidelines](./implementation-notes.md)
- [Project Timeline](./success-criteria.md#project-timeline)

---

*This documentation is maintained as part of the development process. Last updated: July 30, 2024*

## Dev Credentials

For local development, seed or update the admin credentials:

```
node ../scripts/seed-admin.mjs --password=admin
```

The default username is `admin`. Change the password by passing a different value to `--password`. The script safely updates `data/users.json` and is idempotent.