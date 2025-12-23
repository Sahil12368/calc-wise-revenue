-- Create table for featured calculators
CREATE TABLE public.featured_calculators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  calculator_id TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.featured_calculators ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read featured calculators" 
ON public.featured_calculators 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage featured calculators" 
ON public.featured_calculators 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create unique constraint on calculator_id
ALTER TABLE public.featured_calculators ADD CONSTRAINT unique_calculator_id UNIQUE (calculator_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_featured_calculators_updated_at
BEFORE UPDATE ON public.featured_calculators
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default featured calculators
INSERT INTO public.featured_calculators (calculator_id, display_order) VALUES
('mortgage', 1),
('bmi', 2),
('percentage', 3),
('age', 4);