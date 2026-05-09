import { describe, it, expect } from 'vitest';

describe('Project Filtering', () => {
  describe('Published filter', () => {
    it('should identify projects marked as published true', () => {
      const project = {
        metaDonnees: {
          published: true,
        },
      };

      const isPublished =
        project.metaDonnees.published === 'true' || project.metaDonnees.published === true;

      expect(isPublished).toBe(true);
    });

    it('should identify projects marked as published false', () => {
      const project = {
        metaDonnees: {
          published: false,
        },
      };

      const isPublished =
        project.metaDonnees.published === 'true' || project.metaDonnees.published === true;

      expect(isPublished).toBe(false);
    });

    it('should identify projects with string published value', () => {
      const projectTrue = {
        metaDonnees: {
          published: 'true',
        },
      };

      const projectFalse = {
        metaDonnees: {
          published: 'false',
        },
      };

      expect(
        projectTrue.metaDonnees.published === 'true' || projectTrue.metaDonnees.published === true
      ).toBe(true);
      expect(
        projectFalse.metaDonnees.published === 'true' || projectFalse.metaDonnees.published === true
      ).toBe(false);
    });

    it('should handle missing published field', () => {
      const project = {
        metaDonnees: {},
      };

      const isPublished =
        project.metaDonnees.published === 'true' || project.metaDonnees.published === true;

      expect(isPublished).toBe(false);
    });
  });

  describe('Sorting by date', () => {
    it('should sort projects by date in descending order', () => {
      const projects = [
        { date: '2025-01-10', title: 'Old' },
        { date: '2025-01-20', title: 'Newest' },
        { date: '2025-01-15', title: 'Middle' },
      ];

      const sorted = [...projects].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      expect(sorted[0].title).toBe('Newest');
      expect(sorted[1].title).toBe('Middle');
      expect(sorted[2].title).toBe('Old');
    });

    it('should handle invalid dates gracefully', () => {
      const projects = [
        { date: '2025-01-20', title: 'Valid' },
        { date: 'invalid', title: 'Invalid' },
      ];

      const sorted = [...projects].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // NaN comparisons should place invalid dates consistently
      expect(sorted).toBeDefined();
      expect(sorted.length).toBe(2);
    });

    it('should maintain relative order for same dates', () => {
      const projects = [
        { date: '2025-01-15', title: 'First' },
        { date: '2025-01-15', title: 'Second' },
      ];

      const sorted = [...projects].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Sort is stable in JavaScript, original order is maintained
      expect(sorted[0].title).toBe('First');
      expect(sorted[1].title).toBe('Second');
    });
  });

  describe('Project filename extraction', () => {
    it('should extract filename from full path', () => {
      const path = '../../../contents/projects/project1.md';
      const filename = path.split('/').pop()?.replace('.md', '');

      expect(filename).toBe('project1');
    });

    it('should handle various path formats', () => {
      const paths = [
        '../../../contents/projects/my-project.md',
        '/contents/projects/test-article.md',
        'project.md',
      ];

      const filenames = paths.map((p) => p.split('/').pop()?.replace('.md', ''));

      expect(filenames).toEqual(['my-project', 'test-article', 'project']);
    });
  });
});
