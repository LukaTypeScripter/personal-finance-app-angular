
export function updatePagination(currentPage: number, totalPages: number, maxVisiblePages: number): number[] {
    const maxBullets = Math.max(1, Math.floor(maxVisiblePages));
    const safeTotal = Math.max(1, totalPages);
    const safeCurrent = Math.min(Math.max(1, currentPage), safeTotal);

    if (safeTotal <= maxBullets) {
      const out: number[] = [];
      for (let i = 1; i <= safeTotal; i++) out.push(i);
      return out;
    }

    if (maxBullets === 1) {
      return [safeCurrent];
    }
    if (maxBullets === 2) {
      return [1, safeTotal];
    }

    const middleCount = maxBullets - 2; 

    let start = safeCurrent - Math.floor(middleCount / 2);
    let end = start + middleCount - 1;

    if (start < 2) {
      start = 2;
      end = start + middleCount - 1;
    }
    if (end > safeTotal - 1) {
      end = safeTotal - 1;
      start = end - middleCount + 1;
    }

    const pages: number[] = [1];
    for (let i = start; i <= end; i++) pages.push(i);
    pages.push(safeTotal);
    return pages;
  }