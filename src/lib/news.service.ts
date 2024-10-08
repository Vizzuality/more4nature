import { ThematicArea } from '@/lib/case-studies.service';
import { Paginator, SearchParams, PaginatedResult } from '@/lib/paginator';
import { sortByDateDescending } from '@/lib/utils';

export type News = {
  name: string;
  date: string;
  description: string;
  categories: ThematicArea[];
  link?: string;
};

export class NewsService extends Paginator<News> {
  private readonly filters: Partial<News>;

  constructor(news: News[], filters: Partial<News>, params?: SearchParams) {
    super(news, params);
    this.filters = filters || {};
  }

  protected filter(items: News[]): News[] {
    return items.filter((news) => {
      const filterByName = this.filters.name ? news.name.includes(this.filters.name) : true;
      const filterByDate = this.filters.date ? news.date === this.filters.date : true;
      const filterByCategories = this.filters.categories
        ? this.filters.categories.every((cat) => news.categories.includes(cat))
        : true;
      return filterByName && filterByDate && filterByCategories;
    });
  }

  public searchNews(): PaginatedResult<News> {
    const filteredItems = sortByDateDescending(this.filter(this.items));

    return this.paginate(filteredItems);
  }

  static extractFilters(searchParams: URLSearchParams): {
    filters: Partial<News>;
    paginationFilters: SearchParams;
  } {
    const filters: Partial<News> = {
      name: searchParams.get('name') || undefined,
      date: searchParams.get('date') || undefined,
      categories: searchParams.getAll('categories')?.map((cat) => cat as ThematicArea) || undefined,
    };
    const paginationFilters = this.extractPaginationFilters(searchParams);
    return { filters, paginationFilters };
  }
}

export default NewsService;
