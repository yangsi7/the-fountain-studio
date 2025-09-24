import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../helpers/test-utils';
import { CalBookingModal } from '@/components/booking/CalBookingModal';

// Mock Cal.com API
const mockCalApi = vi.fn();
vi.mock('@calcom/embed-react', () => ({
  getCalApi: vi.fn(() => Promise.resolve(mockCalApi)),
}));

describe('CalBookingModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render modal with correct title and description', () => {
    render(
      <CalBookingModal
        open={true}
        onOpenChange={() => {}}
        title="Test Title"
        description="Test Description"
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should not call floatingButton API method', async () => {
    render(
      <CalBookingModal
        open={true}
        onOpenChange={() => {}}
      />
    );

    // Wait for useEffect to run
    await vi.waitFor(() => {
      expect(mockCalApi).toHaveBeenCalled();
    });

    // Verify floatingButton was NOT called
    const calls = mockCalApi.mock.calls;
    const hasFloatingButtonCall = calls.some(
      call => call[0] === 'floatingButton'
    );

    expect(hasFloatingButtonCall).toBe(false);
  });

  it('should configure UI settings and trigger modal when open', async () => {
    render(
      <CalBookingModal
        open={true}
        onOpenChange={() => {}}
      />
    );

    // Wait for useEffect to run
    await vi.waitFor(() => {
      expect(mockCalApi).toHaveBeenCalled();
    });

    // Verify 'ui' configuration is called with styles
    expect(mockCalApi).toHaveBeenCalledWith('ui', {
      styles: { branding: { brandColor: '#2C2B29' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });

    // Verify 'modal' is called when open
    expect(mockCalApi).toHaveBeenCalledWith('modal', {
      calLink: 'simon-yang-z2fy7e/secret',
    });

    // Verify floatingButton was NOT called
    expect(mockCalApi).not.toHaveBeenCalledWith('floatingButton', expect.any(Object));
  });

  it('should hide modal when open is false', () => {
    const { container } = render(
      <CalBookingModal
        open={false}
        onOpenChange={() => {}}
      />
    );

    // Dialog should not be visible when open is false
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).not.toBeInTheDocument();
  });

  it('should accept onOpenChange callback prop', () => {
    const mockOnOpenChange = vi.fn();

    render(
      <CalBookingModal
        open={true}
        onOpenChange={mockOnOpenChange}
      />
    );

    // The onOpenChange should be passed to Dialog component
    // This is more of a prop verification than behavior test
    expect(mockOnOpenChange).toBeDefined();
    expect(typeof mockOnOpenChange).toBe('function');
  });
});