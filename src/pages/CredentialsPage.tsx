import React, { useState } from 'react';
import { useCredentials } from '../context/CredentialContext';
import { CredentialCard } from '../components/credentials/CredentialCard';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { Search, Filter, Lock, PlusCircle, RefreshCcw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CredentialsPage: React.FC = () => {
  const { credentials, isLoading, resetToSampleData } = useCredentials();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'academic' | 'professional'>('all');

  const filteredCredentials = credentials.filter((cred) => {
    const matchesCategory =
      categoryFilter === 'all' || cred.publicData.category === categoryFilter;
    const matchesSearch =
      cred.publicData.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cred.publicData.issuerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cred.publicData.major.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-brand-purple uppercase tracking-wider font-semibold">
              Private State Storage
            </span>
            <Badge variant="purple" size="sm">
              Shielded
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Credentials Repository
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your tamper-proof digital credentials. Sensitive witness attributes remain encrypted locally.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/issuer">
            <Button variant="outline" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Issue New Credential
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              categoryFilter === 'all'
                ? 'bg-brand-purple text-white shadow-lg shadow-purple-900/30'
                : 'bg-midnight-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Credentials ({credentials.length})
          </button>
          <button
            onClick={() => setCategoryFilter('academic')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              categoryFilter === 'academic'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                : 'bg-midnight-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Academic Degrees
          </button>
          <button
            onClick={() => setCategoryFilter('professional')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              categoryFilter === 'professional'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                : 'bg-midnight-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Professional Certs
          </button>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search credential or issuer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="py-2 text-xs"
          />
        </div>
      </div>

      {/* Credentials Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      ) : filteredCredentials.length === 0 ? (
        <Card variant="elevated" className="p-12 text-center border-slate-800 space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-200">No matching credentials found</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search criteria or restore sample verified credentials.
          </p>
          <Button variant="secondary" size="sm" onClick={resetToSampleData} leftIcon={<RefreshCcw className="w-3.5 h-3.5" />}>
            Restore Sample Credentials
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCredentials.map((cred) => (
            <CredentialCard key={cred.publicData.id} credential={cred} />
          ))}
        </div>
      )}
    </div>
  );
};
