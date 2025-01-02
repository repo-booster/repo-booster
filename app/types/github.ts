export interface GitHubTrafficData {
  timestamp: string
  count: number
  uniques: number
}

export interface GitHubReferrer {
  referrer: string
  count: number
  uniques: number
}

export interface GitHubContent {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
}

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  owner: GitHubUser
  private: boolean
  html_url: string
  description: string | null
  fork: boolean
  url: string
  created_at: string
  updated_at: string
  pushed_at: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  forks_count: number
  open_issues_count: number
  default_branch: string
}

export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface GitHubTrafficViews {
  count: number
  uniques: number
  views: GitHubTrafficData[]
}

export interface GitHubTrafficClones {
  count: number
  uniques: number
  clones: GitHubTrafficData[]
}

export interface GitHubRateLimit {
  limit: number
  remaining: number
  reset: number
  used: number
}

export interface GitHubApiError {
  message: string
  documentation_url: string
}

export interface GitHubBranch {
  name: string
  commit: {
    sha: string
    url: string
  }
  protected: boolean
}

export interface GitHubCommit {
  sha: string
  node_id: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    committer: {
      name: string
      email: string
      date: string
    }
    message: string
    tree: {
      sha: string
      url: string
    }
    url: string
    comment_count: number
    verification: {
      verified: boolean
      reason: string
      signature: string | null
      payload: string | null
    }
  }
  url: string
  html_url: string
  comments_url: string
  author: GitHubUser
  committer: GitHubUser
  parents: Array<{
    sha: string
    url: string
    html_url: string
  }>
}

export interface GitHubPullRequest {
  id: number
  node_id: string
  html_url: string
  diff_url: string
  patch_url: string
  issue_url: string
  state: string
  title: string
  body: string | null
  created_at: string
  updated_at: string
  closed_at: string | null
  merged_at: string | null
  user: GitHubUser
  assignees: GitHubUser[]
  requested_reviewers: GitHubUser[]
  head: {
    label: string
    ref: string
    sha: string
    user: GitHubUser
    repo: GitHubRepository
  }
  base: {
    label: string
    ref: string
    sha: string
    user: GitHubUser
    repo: GitHubRepository
  }
  merged: boolean
  mergeable: boolean | null
  rebaseable: boolean | null
  mergeable_state: string
  merged_by: GitHubUser | null
}

export interface GitHubIssue {
  id: number
  node_id: string
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  number: number
  state: string
  title: string
  body: string | null
  user: GitHubUser
  labels: Array<{
    id: number
    node_id: string
    url: string
    name: string
    color: string
    default: boolean
    description: string | null
  }>
  assignee: GitHubUser | null
  assignees: GitHubUser[]
  milestone: {
    url: string
    html_url: string
    labels_url: string
    id: number
    node_id: string
    number: number
    state: string
    title: string
    description: string | null
    creator: GitHubUser
    open_issues: number
    closed_issues: number
    created_at: string
    updated_at: string
    closed_at: string | null
    due_on: string | null
  } | null
  locked: boolean
  active_lock_reason: string | null
  comments: number
  pull_request: {
    url: string
    html_url: string
    diff_url: string
    patch_url: string
  } | null
  closed_at: string | null
  created_at: string
  updated_at: string
}

export interface GitHubRelease {
  id: number
  tag_name: string
  name: string
  body: string | null
  draft: boolean
  prerelease: boolean
  created_at: string
  published_at: string | null
  author: GitHubUser
}
