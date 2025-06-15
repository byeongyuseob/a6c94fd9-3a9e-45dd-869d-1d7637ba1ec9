
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Search, Filter, X, Calendar as CalendarIcon, Users, Settings } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export interface SearchFilters {
  query: string;
  status: string;
  memberCount: string;
  dateRange: {
    from?: Date;
    to?: Date;
  };
  tags: string[];
}

interface AdvancedSearchProps {
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
}

export const AdvancedSearch = ({ onFiltersChange, onClearFilters }: AdvancedSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    status: '',
    memberCount: '',
    dateRange: {},
    tags: [],
  });
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState<'from' | 'to' | null>(null);

  const statusOptions = [
    { value: 'active', label: '활성' },
    { value: 'inactive', label: '비활성' },
    { value: 'maintenance', label: '점검중' },
  ];

  const memberCountOptions = [
    { value: '1-5', label: '1-5명' },
    { value: '6-10', label: '6-10명' },
    { value: '11-20', label: '11-20명' },
    { value: '20+', label: '20명 이상' },
  ];

  const availableTags = ['웹', '모바일', 'API', 'React', 'Node.js', 'TypeScript', 'Database'];

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleQueryChange = (query: string) => {
    updateFilters({ query });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    updateFilters({ tags: newTags });
  };

  const handleClearFilters = () => {
    const clearedFilters: SearchFilters = {
      query: '',
      status: '',
      memberCount: '',
      dateRange: {},
      tags: [],
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = filters.query || filters.status || filters.memberCount || 
    filters.dateRange.from || filters.dateRange.to || filters.tags.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="프로젝트, 설명, 태그로 검색..."
            value={filters.query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
        
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              필터
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
                  {[filters.status, filters.memberCount, filters.dateRange.from ? '날짜' : '', ...filters.tags]
                    .filter(Boolean).length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          
          <PopoverContent className="w-96 p-0" align="end">
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">고급 필터</h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="h-7 px-2 text-xs"
                  >
                    <X className="h-3 w-3 mr-1" />
                    초기화
                  </Button>
                )}
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {/* 상태 필터 */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  <Settings className="h-3 w-3" />
                  상태
                </Label>
                <Select value={filters.status} onValueChange={(value) => updateFilters({ status: value })}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="모든 상태" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">모든 상태</SelectItem>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 멤버 수 필터 */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  멤버 수
                </Label>
                <Select value={filters.memberCount} onValueChange={(value) => updateFilters({ memberCount: value })}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="모든 크기" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">모든 크기</SelectItem>
                    {memberCountOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 날짜 범위 필터 */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  업데이트 날짜
                </Label>
                <div className="flex gap-2">
                  <Popover open={datePickerOpen === 'from'} onOpenChange={(open) => setDatePickerOpen(open ? 'from' : null)}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-8 text-xs flex-1 justify-start">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {filters.dateRange.from ? format(filters.dateRange.from, 'MM/dd', { locale: ko }) : '시작일'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.from}
                        onSelect={(date) => {
                          updateFilters({ dateRange: { ...filters.dateRange, from: date } });
                          setDatePickerOpen(null);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Popover open={datePickerOpen === 'to'} onOpenChange={(open) => setDatePickerOpen(open ? 'to' : null)}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="h-8 text-xs flex-1 justify-start">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {filters.dateRange.to ? format(filters.dateRange.to, 'MM/dd', { locale: ko }) : '종료일'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.to}
                        onSelect={(date) => {
                          updateFilters({ dateRange: { ...filters.dateRange, to: date } });
                          setDatePickerOpen(null);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Separator />

              {/* 태그 필터 */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">태그</Label>
                <div className="flex flex-wrap gap-1">
                  {availableTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={filters.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer text-xs h-6 hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* 활성 필터 표시 */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.status && (
            <Badge variant="secondary" className="gap-1">
              상태: {statusOptions.find(s => s.value === filters.status)?.label}
              <X
                className="h-3 w-3 cursor-pointer hover:bg-destructive hover:text-destructive-foreground rounded"
                onClick={() => updateFilters({ status: '' })}
              />
            </Badge>
          )}
          {filters.memberCount && (
            <Badge variant="secondary" className="gap-1">
              멤버: {memberCountOptions.find(m => m.value === filters.memberCount)?.label}
              <X
                className="h-3 w-3 cursor-pointer hover:bg-destructive hover:text-destructive-foreground rounded"
                onClick={() => updateFilters({ memberCount: '' })}
              />
            </Badge>
          )}
          {filters.dateRange.from && (
            <Badge variant="secondary" className="gap-1">
              {format(filters.dateRange.from, 'MM/dd', { locale: ko })} 이후
              <X
                className="h-3 w-3 cursor-pointer hover:bg-destructive hover:text-destructive-foreground rounded"
                onClick={() => updateFilters({ dateRange: { ...filters.dateRange, from: undefined } })}
              />
            </Badge>
          )}
          {filters.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <X
                className="h-3 w-3 cursor-pointer hover:bg-destructive hover:text-destructive-foreground rounded"
                onClick={() => handleTagToggle(tag)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
